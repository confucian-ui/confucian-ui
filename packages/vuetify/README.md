# @confucian-ui/vuetify

**Confucian** 主題的 Vuetify 4 版本。以儒家氣質為靈感的 admin template 套件：淺色模式如攤開的宣紙、深色模式如深夜的書齋。

## 安裝

```bash
pnpm add @confucian-ui/vuetify vuetify vue @phosphor-icons/vue vue-router
```

同時需要 peer dependencies：`vue ^3.5`、`vuetify ^4.0`、`vue-router ^4.4`、`@phosphor-icons/vue ^2.2`。

## 快速開始

```ts
// main.ts
import { createApp } from "vue";
import { createConfucian } from "@confucian-ui/vuetify";

// 順序重要：vuetify/styles 要在 @confucian-ui/vuetify/styles 之前
import "vuetify/styles";
import "@confucian-ui/vuetify/styles";

import App from "./App.vue";

const app = createApp(App);
const confucian = createConfucian();  // 預設 defaultTheme: "auto"
app.use(confucian);
app.mount("#app");
```

## 主題切換

```ts
// 預設跟隨系統偏好，第一次啟動後寫入 localStorage
createConfucian({ defaultTheme: "auto" }); // "auto" | "light" | "dark"
```

使用者手動切換：

```ts
import { useConfucianTheme } from "@confucian-ui/vuetify";

const { mode, toggle } = useConfucianTheme();
// mode.value → "light" | "dark"
// toggle() → 切換兩態
```

## 元件

```ts
import {
	ConfucianLayout,        // 完整 layout（sidebar + appbar + main + footer）
	ConfucianBlankLayout,   // 無 sidebar，用於 auth / error 頁（帶墨竹背景）
	ConfucianSidebar,
	ConfucianAppBar,
	ConfucianFooter,
	ConfucianBackToTop,
	ConfucianLogo,
	ConfucianThemeToggle,
	ConfucianUserMenu,
	ConfucianBreadcrumb,
	ConfucianPageHeader,
	ConfucianBambooDivider,
} from "@confucian-ui/vuetify";
```

## 樣式客製化

SCSS 變數以 `!default` 宣告，可在 `@use` 前覆寫：

```scss
// 先覆寫變數，再 @use
$bamboo-primary: #c8833f;
@use "@confucian-ui/vuetify/styles/variables" as confucian;
```

色票單一來源為 `tokens.ts`，透過 Vuetify ThemeDefinition 產出 `--v-theme-*` CSS variables，SCSS 以 `rgb(var(--v-theme-xxx))` 讀取。

## 圖示系統

預設採 **Phosphor Icons duotone** 變體，純線偏冷、純填偏重，雙層次取其中庸。
指定其他 weight 可加後綴：`ph-house-regular`、`ph-house-bold`、`ph-house-fill` 等。

Vuetify 所有內建 alias（`$success`、`$menu`、`$checkboxOn`、`$sortAsc` 等）皆已對映。

## 授權

[PolyForm Noncommercial 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0)。

- 個人、研究、教育、非營利等非商業目的免費使用
- 商業使用請來信 [don.m.t.tsai@gmail.com](mailto:don.m.t.tsai@gmail.com) 洽談授權

詳見 repo 根目錄的 [LICENSE](https://github.com/MuTsunTsai/confucian-ui/blob/main/LICENSE)。
