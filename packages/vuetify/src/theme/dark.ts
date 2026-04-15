import { tokens } from "./tokens";

import type { ThemeDefinition } from "vuetify";

export const confucianDark: ThemeDefinition = {
	dark: true,
	colors: {
		// body 背景走冷暗灰；card 走 cardSurfaceDark 比 body 略深一階
		"background": tokens.surfaceDark,
		"surface": tokens.cardSurfaceDark,
		"surface-bright": tokens.surfaceVariantDark,
		"surface-light": tokens.surfaceVariantDark,
		"surface-variant": tokens.surfaceVariantDark,
		"on-surface-variant": tokens.onSurfaceDark,
		"sidebar-active": tokens.sidebarActiveDark,

		// 深色模式 primary：竹黃褐淺化（暖光更柔，於暗底上更舒服）
		// 與淺色的朱紅 primary 是有意分離的氣質選擇
		"primary": tokens.bambooDark,
		"primary-darken-1": tokens.bambooLight,
		"secondary": tokens.ochreLight,
		"secondary-darken-1": tokens.ochre,
		"accent": tokens.bambooGreenLight,

		"success": "#96cf7c",
		"warning": "#e0ab54",
		// 提亮並降飽和，讓黑字可讀；與淺色版同走「對比為深色文字」
		"error": "#f08583",
		"info": "#9cc6df",

		"on-background": tokens.onSurfaceDark,
		"on-surface": tokens.onSurfaceDark,
		"on-primary": tokens.charredInk,
		"on-secondary": tokens.charredInk,
		"on-accent": tokens.charredInk,
		"on-success": tokens.charredInk,
		"on-warning": tokens.charredInk,
		"on-error": tokens.charredInk,
		"on-info": tokens.charredInk,

		"sidebar-bg": tokens.sidebarBgDark,
		"sidebar-surface": tokens.sidebarSurfaceDark,
		"sidebar-fg": tokens.sidebarFgDark,
		"sidebar-fg-muted": tokens.sidebarFgMutedDark,
		"on-sidebar-bg": tokens.sidebarFgDark,
		"on-sidebar-surface": tokens.sidebarFgDark,
	},
	variables: {
		"border-color": tokens.borderDark,
		"border-opacity": 0.5,
		"high-emphasis-opacity": 0.92,
		// 次要文字提亮，長時間閱讀不吃力
		"medium-emphasis-opacity": 0.78,
		"disabled-opacity": 0.38,
		"idle-opacity": 0.08,
		"hover-opacity": 0.1,
		"focus-opacity": 0.16,
		"selected-opacity": 0.14,
		"activated-opacity": 0.16,
		"pressed-opacity": 0.18,
		"dragged-opacity": 0.12,
		"theme-kbd": tokens.sidebarFg,
		"theme-on-kbd": tokens.charredInk,
		"theme-code": tokens.surfaceVariantDark,
		"theme-on-code": tokens.onSurfaceDark,
	},
};
