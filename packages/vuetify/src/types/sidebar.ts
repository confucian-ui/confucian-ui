import type { MenuEntry } from "./menu";

export interface SidebarConfig {
	items: MenuEntry[];
	// 側欄寬度（展開時），單位 px
	width?: number;
	// 折疊後寬度（icon-only），單位 px
	railWidth?: number;
	// 是否允許折疊
	collapsible?: boolean;
	// 預設是否折疊
	defaultCollapsed?: boolean;
	// 側欄頂部品牌區顯示的文字
	title?: string;
}

// 使用者最終落地的主題模式——只有二擇一，"system" 僅用於「從未設定過」的初次判定
export type ThemeMode = "light" | "dark";

export interface ConfucianRuntimeOptions {
	themeStorageKey: string;
	sidebarStorageKey: string;
}
