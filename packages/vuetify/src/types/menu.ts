import type { RouteLocationRaw } from "vue-router";

export interface MenuBadge {
	text: string;
	color?: string;
}

// 群組標題：只顯示一段淡化小字，不可點擊
export interface MenuHeading {
	heading: string;
}

// 分隔線：在選單中呈現為竹紋分隔
export interface MenuDivider {
	divider: true;
}

// 可點擊連結（葉節點）
export interface MenuLink {
	title: string;
	icon?: string;
	to?: RouteLocationRaw;
	href?: string;
	// 供 href 外連使用；常用值："_blank"（開新分頁）
	target?: string;
	badge?: MenuBadge;
	meta?: Record<string, unknown>;
}

// 可展開的群組（含子項目）
export interface MenuGroup {
	title: string;
	icon?: string;
	children: MenuEntry[];
	badge?: MenuBadge;
	meta?: Record<string, unknown>;
}

export type MenuEntry = MenuHeading | MenuDivider | MenuLink | MenuGroup;

// 為保留向後相容的命名，對外同時暴露 MenuItem（= MenuEntry）
// 新程式建議使用 MenuEntry，語意更清楚
export type MenuItem = MenuEntry;

export function isMenuHeading(e: MenuEntry): e is MenuHeading {
	return "heading" in e;
}

export function isMenuDivider(e: MenuEntry): e is MenuDivider {
	return "divider" in e && e.divider === true;
}

export function isMenuGroup(e: MenuEntry): e is MenuGroup {
	return "children" in e && Array.isArray((e as MenuGroup).children);
}

export function isMenuLink(e: MenuEntry): e is MenuLink {
	return !isMenuHeading(e) && !isMenuDivider(e) && !isMenuGroup(e);
}
