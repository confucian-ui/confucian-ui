import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import { pluginSass } from "@rsbuild/plugin-sass";
import { VuetifyPlugin } from "webpack-plugin-vuetify";

// 部署到 GitHub Pages 時需要 base path（如 "/confucian-ui/"）；
// 本地開發與 preview 維持 "/"。由 CI 設定 BASE_PATH 環境變數帶入
const basePath = process.env.BASE_PATH ?? "/";

export default defineConfig({
	plugins: [
		pluginVue(),
		pluginSass({
			sassLoaderOptions: {
				api: "modern-compiler",
				additionalData: "@use \"@confucian-ui/vuetify/styles/variables\" as confucian;\n",
			},
		}),
	],
	tools: {
		rspack: (_, { appendPlugins }) => {
			appendPlugins(new VuetifyPlugin({
				autoImport: true,
			}));
		},
	},
	source: {
		entry: {
			index: "./src/main.ts",
		},
		// 把 base path 塞進 define，供 router 的 createWebHistory 使用
		define: {
			"import.meta.env.BASE_URL": JSON.stringify(basePath),
		},
	},
	output: {
		assetPrefix: basePath,
	},
	resolve: {
		alias: {
			"@": "./src",
		},
	},
	html: {
		template: "./index.html",
		title: "Confucian — Vuetify Admin Demo",
		favicon: "./src/assets/logo.svg",
	},
	server: {
		port: 5173,
	},
});
