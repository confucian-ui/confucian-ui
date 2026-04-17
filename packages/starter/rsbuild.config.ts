import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import { pluginSass } from "@rsbuild/plugin-sass";
import { VuetifyPlugin } from "webpack-plugin-vuetify";

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
