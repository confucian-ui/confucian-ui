import type { MenuEntry } from "@confucian-ui/vuetify";

// 側欄選單定義。與 router/index.ts 的 routes 保持一致
// 側欄 icon 走 Phosphor duotone（adapter 預設）；若真的需要單色，後綴改為 `-regular`
export const menu: MenuEntry[] = [
	{ heading: "管理" },
	{ title: "使用者", icon: "ph-users-three", to: "/users" },
	{
		title: "訂單",
		icon: "ph-clipboard-text",
		to: "/orders",
		badge: { text: "12", color: "error" },
	},

	{ heading: "介面" },
	{
		title: "UI 元件",
		icon: "ph-palette",
		children: [
			{ title: "排版", to: "/ui/typography", icon: "ph-text-aa" },
			{ title: "按鈕", to: "/ui/buttons", icon: "ph-cursor-click" },
			{ title: "卡片", to: "/ui/cards", icon: "ph-cards-three" },
			{ title: "警示", to: "/ui/alerts", icon: "ph-warning-circle" },
			{ title: "表單元件", to: "/ui/forms", icon: "ph-textbox" },
			{ title: "對話框", to: "/ui/dialogs", icon: "ph-app-window" },
			{ title: "日期時間", to: "/ui/datetime", icon: "ph-calendar-dots" },
		],
	},
	{ title: "圖表", icon: "ph-chart-pie", to: "/charts" },

	{ heading: "表單" },
	{ title: "基本表單", icon: "ph-article", to: "/forms/basic" },
	{ title: "進階表單", icon: "ph-gear", to: "/forms/advanced" },

	{ divider: true },

	{ heading: "個人" },
	{ title: "個人資料", icon: "ph-user", to: "/profile" },
	{ title: "定價方案", icon: "ph-receipt", to: "/pricing" },
	{
		title: "授權驗證",
		icon: "ph-lock",
		children: [
			{ title: "登入頁面", icon: "ph-sign-in", to: "/auth/login" },
			{ title: "註冊頁面", icon: "ph-user-plus", to: "/auth/register" },
			{ title: "忘記密碼", icon: "ph-key", to: "/auth/forgot" },
		],
	},

	{ heading: "其它" },
	{
		title: "錯誤頁",
		icon: "ph-warning",
		children: [
			{ title: "404 - 頁面不存在", to: "/error/404", icon: "ph-file-x" },
			{ title: "500 - 伺服器錯誤", to: "/error/500", icon: "ph-file-x" },
		],
	},
];
