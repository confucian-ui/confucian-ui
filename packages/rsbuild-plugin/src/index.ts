// @confucian-ui/rsbuild-plugin 公開 API
//
// 用法：
//   import { pluginConfucian } from "@confucian-ui/rsbuild-plugin";
//
//   export default defineConfig({
//       plugins: [pluginVue(), pluginSass(), pluginConfucian()],
//   });
//
// 會自動整合：
//   1. webpack-plugin-vuetify 的 auto-import + Vuetify tree-shaking
//   2. Phosphor Icons tree-shaking（配合 @confucian-ui/vuetify 的 registry API）

import { VuetifyPlugin } from "webpack-plugin-vuetify";

import { PhosphorTreeshakePlugin } from "./phosphor/plugin";

import type { RsbuildPlugin } from "@rsbuild/core";

export interface PluginConfucianOptions {
	/**
	 * 傳給 webpack-plugin-vuetify 的選項。
	 * 預設啟用 autoImport: true
	 */
	vuetify?: {
		autoImport?: boolean;
		styles?: true | "none" | "sass" | { configFile: string };
	};

	/**
	 * 是否啟用 Phosphor Icons tree-shaking。預設 true。
	 * 關閉時主 bundle 會含完整的 @phosphor-icons/vue barrel export（1500+ 個元件）
	 */
	phosphor?: boolean;
}

export function pluginConfucian(options: PluginConfucianOptions = {}): RsbuildPlugin {
	const vuetifyOptions = { autoImport: true, ...options.vuetify };
	const enablePhosphor = options.phosphor ?? true;

	return {
		name: "confucian:rsbuild-plugin",
		setup(api) {
			api.modifyRspackConfig(config => {
				config.plugins ??= [];
				config.plugins.push(new VuetifyPlugin(vuetifyOptions));
				if(enablePhosphor) {
					config.plugins.push(new PhosphorTreeshakePlugin());
				}
			});
		},
	};
}

export { PhosphorTreeshakePlugin } from "./phosphor/plugin";
