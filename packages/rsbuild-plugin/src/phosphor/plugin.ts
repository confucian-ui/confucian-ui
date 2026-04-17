// Rspack plugin：把 phosphor-treeshake-loader 注入到 module rules。
//
// 原理：
//   - @confucian-ui/vuetify 的 phosphorSet 用 registry Map + registerPhosphorIcon() API
//   - 消費端源碼用 "ph-xxx" 字串提及 icon → 此 loader 自動注入對應的 import + register
//   - 讓 @phosphor-icons/vue 的 barrel import 真的可以 tree-shake
//     （原本的 `import *` 因動態 property access 無法 tree-shake）

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import type { Compiler, RspackPluginInstance } from "@rspack/core";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// loader 建置後會跟 plugin 同樣放在 dist/ 下，以 loader.js 命名
// rslib 產出格式：dist/index.js、dist/loader.js
const LOADER_PATH = resolve(__dirname, "loader.js");

export class PhosphorTreeshakePlugin implements RspackPluginInstance {
	apply(compiler: Compiler): void {
		// 把 loader 注入到 .vue / .ts / .tsx / .mjs / .js 的 module rules 最前面，
		// 攔截使用者源碼，在檔尾附加 register 呼叫。
		// 跳過 node_modules（library 自己已經預註冊用到的 icon；其他套件也不該被改）
		compiler.options.module.rules.unshift({
			test: /\.(vue|tsx?|m?js)$/,
			exclude: /node_modules/,
			enforce: "post", // 在其他 loader（vue-loader 等）處理完之後再跑
			use: [{ loader: LOADER_PATH }],
		});
	}
}
