<p align="center">
	<img src="./logo.png" alt="Confucian" width="160" />
</p>

# Confucian

一個以儒家氣質為靈感的 Vuetify v4 admin template。取其莊嚴肅穆、竹林雅逸之意；淺色模式如**攤開的宣紙**，深色模式如**深夜的書齋**。

## Monorepo 結構

本專案以 pnpm workspace 管理四個 package：

| Package | 說明 | 發布狀態 |
| --- | --- | --- |
| [packages/vuetify](packages/vuetify/) — `@confucian-ui/vuetify` | Vuetify 4 版本：設定工具、共用元件、全域樣式 | 發布到 NPM |
| [packages/rsbuild-plugin](packages/rsbuild-plugin/) — `@confucian-ui/rsbuild-plugin` | Rsbuild plugin：一行整合 Vuetify auto-import + Phosphor tree-shaking | 發布到 NPM |
| [packages/demo](packages/demo/) — `confucian-demo` | 完整展示範本，包含各類頁面 | 私有 |
| [packages/starter](packages/starter/) — `confucian-starter` | 乾淨起始範本，只含登入、錯誤、空白首頁 | 私有 |

> 套件名稱 `@confucian-ui/vuetify` 而非 `core`，是為了預留未來其他 UI 框架版本（`@confucian-ui/bootstrap` 等）的空間。屆時若有共用層才會抽出 `@confucian-ui/core`。

## 技術堆疊

- Vue 3.5 + Vuetify 4
- Vue Router 5（手寫路由）
- Rsbuild（demo / starter 的建置）+ `@confucian-ui/rsbuild-plugin`（Vuetify auto-import + Phosphor tree-shaking）
- Rslib（`@confucian-ui/vuetify` 與 `@confucian-ui/rsbuild-plugin` 的 library 建置）
- Phosphor Icons（預設 duotone 變體）
- TypeScript 6、ESM、tab 縮排

## 快速開始

```bash
pnpm install
pnpm dev
```

- Demo：[http://localhost:5173](http://localhost:5173)
- Starter：[http://localhost:5174](http://localhost:5174)

## 設計理念

兩個模式對應兩種時空意象：

- **淺色 = 攤開的宣紙**：日光下伏案書寫，米黃紙面、深褐墨跡、竹黃褐燭火點綴
- **深色 = 深夜的書齋**：書童燈下讀書，冷暗灰的夜幕、黑檀木的書架、暖光燈罩透出的竹黃褐

具體落實：

- **色彩**：primary 採竹黃褐（淺色 `#C8833F`、深色 `#D9A877`），深淺模式同色系保品牌一致
- **Side menu**：淺色模式沿用宣紙米底 + 深色文字（書桌一隅）；深色模式走黑檀木 `#211215`（夜書齋的木架）
- **圓角**：微圓角，在方正與柔和之間取中庸
- **圖示**：Phosphor Icons 預設 duotone 變體。純線稿偏冷、完全填滿偏重，duotone 雙層次在兩極之間取中庸，正呼應儒家「過猶不及」之意
- **回字紋卡片**：`<v-card>` 四角以 SVG mask 繪製回字紋裝飾，隨邊框色同步
- **紙質 / 夜色紋路**：`v-main` 疊一層 SVG feTurbulence —— 淺色是宣紙上的深褐顆粒（multiply）、深色是夜色中的淡白顆粒（screen）
- **竹紋分隔線**：`ConfucianBambooDivider` 以 CSS 模擬竹節分節感
- **墨竹背景**：登入頁以 SVG 繪製墨竹葉，低飽和低透明度

## License

本專案以 **[PolyForm Noncommercial 1.0.0](./LICENSE)** 授權發行。

- **個人、研究、教育、非營利** 等非商業目的：免費使用、可修改、可散佈
- **商業使用**（包含公司內部工具、客戶交付、SaaS 產品等）：**禁止**，請來信 [don.m.t.tsai@gmail.com](mailto:don.m.t.tsai@gmail.com) 洽談商業授權

授權僅涵蓋 Confucian 本身的程式碼、色彩系統與元件設計。專案所依賴之第三方軟體各自的授權條款不受影響。
