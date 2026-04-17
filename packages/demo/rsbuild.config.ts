import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import { pluginSass } from "@rsbuild/plugin-sass";
import { pluginConfucian } from "@confucian-ui/rsbuild-plugin";
import { RsdoctorRspackPlugin } from "@rsdoctor/rspack-plugin";

const isProduction = process.env.NODE_ENV === "production";

// 部署到 GitHub Pages 時需要 base path（如 "/confucian-ui/"）；
// 本地開發與 preview 維持 "/"。由 CI 設定 BASE_PATH 環境變數帶入
const basePath = process.env.BASE_PATH ?? "/";

const useRsdoctor = process.argv.includes("doctor");

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
	tools: {
		rspack: (_, { appendPlugins }) => {
			if(process.env.RSDOCTOR || useRsdoctor) {
				appendPlugins(new RsdoctorRspackPlugin({
					linter: {
						rules: { "ecma-version-check": "off" },
					},
					supports: {
						generateTileGraph: true,
					},
					port: 6060,
				}));
			}
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
	performance: !isProduction ? undefined : {
		chunkSplit: {
			strategy: "custom",
			splitChunks: {
				cacheGroups: {
					phosphor: {
						test: /phosphor/,
						name: "phosphor",
						chunks: "initial",

					},
					vue: {
						test: /@vue|vue-router/,
						name: "vue",
						chunks: "initial",
						priority: 2,
					},
					vuetify: {
						test: /node_modules.+vuetify/,
						name: "vuetify",
						chunks: "initial",
						priority: 1,
					},

				},
			},
		},
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
		host: "::",
		port: 5173,
	},
});
