/* eslint-disable no-await-in-loop */
/* eslint-disable require-atomic-updates */
import { spawn } from "node:child_process";
import { defineConfig } from "@rslib/core";
import { pluginVue } from "@rsbuild/plugin-vue";

import type { RsbuildPlugin } from "@rsbuild/core";

// Confucian Core 的 library 建置配置
// - 僅輸出 ESM，專案全面採用 ESM 語法
// - 多進入點：index / blueprint / components / composables
// - Vue / Vuetify / Tabler / vue-router 全部外部化（peerDependencies）
// - SCSS 不進 bundle，以 source 形式發布在 src/styles/（由 package.json.files 納入）
// - d.ts 不由 Rslib 產生（對 .vue 型別支援有限），改用 vue-tsc 獨立處理

// 把子程序包成 Promise，方便在 hook 中 await
function run(cmd: string, args: string[]): Promise<void> {
	return new Promise((resolve, reject) => {
		const child = spawn(cmd, args, { stdio: "inherit", shell: true });
		child.on("close", code => code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`)));
		child.on("error", reject);
	});
}

// 建置後處理：跑 vue-tsc 產 d.ts，再跑 sync-dist 把 staging 同步到 dist。
// 用 mutex + pending flag 確保：watch 模式下若 sync 期間又有新編譯完成，
// 不會兩次 sync 互相覆寫；最後一次的 staging 一定會追上。
function postBuildPlugin(): RsbuildPlugin {
	let running = false;
	let pending = false;

	// 互斥鎖：Node 是單執行緒，這裡的 read/write 不會真的 race
	const flush = async () => {
		if(running) {
			pending = true;
			return;
		}
		running = true;
		try {
			do {
				pending = false;
				// 這兩步必須序列：vue-tsc 寫 staging/types/，sync-dist 才能搬到 dist/
				await run("vue-tsc", ["-p", "tsconfig.build.json"]);
				await run("node", ["scripts/sync-dist.mjs"]);
			} while(pending); // 期間若被再次觸發，再跑一輪
		} catch(err) {
			console.error("[post-build] 失敗：", err);
		} finally {
			running = false;
		}
	};

	return {
		name: "confucian:post-build",
		setup(api) {
			api.onAfterBuild(flush);
		},
	};
}

export default defineConfig({
	plugins: [pluginVue(), postBuildPlugin()],
	lib: [
		{
			format: "esm",
			syntax: "es2022",
			bundle: true,
			dts: false,
			source: {
				entry: {
					index: "./src/index.ts",
					blueprint: "./src/blueprint.ts",
					components: "./src/components/index.ts",
					composables: "./src/composables/index.ts",
				},
			},
			output: {
				// 先輸出到 staging 資料夾；建置完成後由 scripts/sync-dist.mjs
				// 將檔案「個別覆蓋」到正式 dist/，避免 Rsbuild dev 看到 dist 短暫清空
				distPath: {
					root: "./.dist-staging",
				},
			},
		},
	],
	source: {
		// 不打包 SCSS：以 source 形式透過 package.json exports 的 ./styles/* 供消費者存取
		exclude: [/\.scss$/],
	},
	output: {
		target: "web",
		cleanDistPath: true,
		externals: [
			"vue",
			"vuetify",
			"vue-router",
			/^vuetify\//,
			/^@phosphor-icons\/vue/,
		],
	},
});
