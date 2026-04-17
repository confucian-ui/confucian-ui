<p align="center">
	<img src="https://raw.githubusercontent.com/confucian-ui/confucian-ui/main/logo.png" alt="Confucian" width="160" />
</p>

# @confucian-ui/rsbuild-plugin

Rsbuild plugin for **Confucian UI** — 一行整合 Vuetify auto-import + Phosphor Icons tree-shaking。

## 安裝

```bash
pnpm add -D @confucian-ui/rsbuild-plugin
```

## 使用

```ts
// rsbuild.config.ts
import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import { pluginSass } from "@rsbuild/plugin-sass";
import { pluginConfucian } from "@confucian-ui/rsbuild-plugin";

export default defineConfig({
	plugins: [
		pluginVue(),
		pluginSass(),
		pluginConfucian(),
	],
});
```

這樣會自動整合：

1. **webpack-plugin-vuetify** 的 Vuetify 元件 auto-import 與 tree-shaking
2. **Phosphor Icons tree-shaking** — 只打包實際用到的 icon（配合 `@confucian-ui/vuetify` 的 registry API），避免 1500+ 個元件全部進 bundle

## 選項

```ts
pluginConfucian({
	vuetify: { autoImport: true },   // 傳給 webpack-plugin-vuetify
	phosphor: true,                   // 開啟 Phosphor tree-shaking
});
```

## 授權

[PolyForm Noncommercial 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0)。
個人、研究、教育、非營利用途免費；商業使用請聯繫作者。
