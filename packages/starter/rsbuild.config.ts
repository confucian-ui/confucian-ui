import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import { pluginSass } from "@rsbuild/plugin-sass";
import { pluginConfucian } from "@confucian-ui/rsbuild-plugin";

export default defineConfig({
	plugins: [
		pluginVue(),
		pluginSass({
			sassLoaderOptions: {
				api: "modern-compiler",
				additionalData: "@use \"@confucian-ui/vuetify/styles/variables\" as confucian;\n",
			},
		}),
		pluginConfucian(),
	],
	source: {
		entry: {
			index: "./src/main.ts",
		},
	},
	resolve: {
		alias: {
			"@": "./src",
		},
	},
	html: {
		template: "./index.html",
		title: "Confucian Starter",
		favicon: "./src/assets/logo.svg",
	},
	server: {
		host: "::",
		port: 5174,
	},
});
