import { tokens } from "./tokens";

import type { ThemeDefinition } from "vuetify";

export const confucianLight: ThemeDefinition = {
	dark: false,
	colors: {
		"background": tokens.xuanPaper,
		"surface": tokens.surfaceLight,
		"surface-bright": tokens.surfaceVariantLight,
		"surface-light": tokens.surfaceVariantLight,
		"surface-variant": tokens.surfaceVariantLight,
		"on-surface-variant": tokens.onSurfaceLight,
		"sidebar-active": tokens.sidebarActiveLight,

		// 與深色 primary（bambooDark）同色系：取稍深一階的竹黃褐，淺暗底各自舒服
		"primary": tokens.bambooLight,
		"primary-darken-1": "#A66A2E",
		"secondary": tokens.ochre,
		"secondary-darken-1": "#554232",
		"accent": tokens.bambooGreen,

		"success": tokens.willowGreen,
		"warning": tokens.vermilion,
		// error 回歸紅色：深紅警示，與 primary 暖褐拉開色相
		"error": tokens.vermilionRed,
		"info": tokens.skyInk,

		"on-background": tokens.onSurfaceLight,
		"on-surface": tokens.onSurfaceLight,
		"on-primary": tokens.onPrimary,
		"on-primary-darken-1": tokens.onPrimary,
		"on-secondary": tokens.onPrimary,
		"on-secondary-darken-1": tokens.onPrimary,
		"on-accent": tokens.onPrimary,
		"on-success": tokens.onPrimary,
		"on-warning": tokens.onPrimary,
		"on-error": tokens.onPrimary,
		"on-info": tokens.onPrimary,

		// 側欄色（light 模式）：米黃底 + 深色文字
		"sidebar-bg": tokens.sidebarBg,
		"sidebar-surface": tokens.sidebarSurface,
		"sidebar-fg": tokens.sidebarFg,
		"sidebar-fg-muted": tokens.sidebarFgMuted,
		"on-sidebar-bg": tokens.sidebarFg,
		"on-sidebar-surface": tokens.sidebarFg,
	},
	variables: {
		"border-color": tokens.borderLight,
		"border-opacity": 0.6,
		"high-emphasis-opacity": 0.92,
		// 次要文字在宣紙色上稍微拉亮，避免 caption / meta 字偏灰不易讀
		"medium-emphasis-opacity": 0.78,
		"disabled-opacity": 0.38,
		"idle-opacity": 0.04,
		"hover-opacity": 0.06,
		"focus-opacity": 0.12,
		"selected-opacity": 0.1,
		"activated-opacity": 0.12,
		"pressed-opacity": 0.14,
		"dragged-opacity": 0.08,
		"theme-kbd": tokens.onSurfaceLight,
		"theme-on-kbd": tokens.xuanPaper,
		"theme-code": tokens.surfaceVariantLight,
		"theme-on-code": tokens.onSurfaceLight,
	},
};
