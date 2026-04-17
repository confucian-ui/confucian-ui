import { defineConfig } from "@rslib/core";

// @confucian-ui/rsbuild-plugin 的建置配置
// - Node.js 環境執行（build-time 工具），target: "node"
// - 兩個 entry：
//     * index.ts → 消費端 import 的 pluginConfucian factory
//     * loader.ts → Rspack loader，需保持獨立檔（plugin 以路徑引用）
// - 單純 TS 編譯、不用 Vue/Sass
// - d.ts 由 tsc 產生（見 package.json scripts.build）

export default defineConfig({
	lib: [
		{
			format: "esm",
			syntax: "es2022",
			bundle: true,
			dts: false,
			source: {
				entry: {
					index: "./src/index.ts",
					loader: "./src/phosphor/loader.ts",
				},
			},
			output: {
				distPath: {
					root: "./dist",
				},
			},
		},
	],
	output: {
		target: "node",
		cleanDistPath: true,
		externals: [
			"webpack-plugin-vuetify",
			"@rspack/core",
			"@rsbuild/core",
		],
	},
});
