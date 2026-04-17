import { reactive, readonly, watch } from "vue";
import { createVuetify } from "vuetify";
import { Ripple } from "vuetify/directives";
import { zhHant, en } from "vuetify/locale";

import { confucianBlueprint } from "./blueprint";
import { confucianLight } from "./theme/light";
import { confucianDark } from "./theme/dark";
import { installNativePickerDelegate } from "./utils/nativePickerDelegate";
// 只 import library 自己的 SFC 用到的 Vuetify 元件與指令。
// 不用 `import *`——那會把所有 Vuetify 元件拉進 library dist，消費端無法 tree-shake。
// 消費端自己的 Vuetify 元件由 @confucian-ui/rsbuild-plugin（webpack-plugin-vuetify）auto-import。
import * as ConfucianVuetifyComponents from "./vuetifyImports";

import type { ThemeDefinition, VuetifyOptions } from "vuetify";
import type { App, InjectionKey } from "vue";
import type { ThemeMode, ConfucianRuntimeOptions } from "./types/sidebar";

export interface CreateConfucianOptions {
	// 首次啟動且 localStorage 無值時的主題：
	// - "auto"（預設）：依系統偏好 prefers-color-scheme 決定
	// - "light" / "dark"：強制指定
	// 之後使用者切換過主題，就以 localStorage 為準，不再跟系統連動
	defaultTheme?: ThemeMode | "auto";
	// 主題模式在 localStorage 的 key
	themeStorageKey?: string;
	// 側欄折疊狀態在 localStorage 的 key
	sidebarStorageKey?: string;
	// 主題定義覆寫（可部分覆蓋 confucianLight / confucianDark）
	overrides?: {
		light?: Partial<ThemeDefinition>;
		dark?: Partial<ThemeDefinition>;
		defaults?: VuetifyOptions["defaults"];
	};
	// 語系設定；預設採用台灣正體（zh-Hant），fallback 英文
	// 要用其它語系，可自行 `import { xx } from "vuetify/locale"` 傳入 vuetify.locale
	locale?: VuetifyOptions["locale"];
	// 其它要傳給 createVuetify 的原生選項
	vuetify?: VuetifyOptions;
}

export interface ConfucianRuntime {
	readonly options: ConfucianRuntimeOptions;
}

export const CONFUCIAN_RUNTIME_KEY = Symbol("confucian-runtime") as InjectionKey<ConfucianRuntime>;

function mergeThemeDefinition(base: ThemeDefinition, override?: Partial<ThemeDefinition>): ThemeDefinition {
	if(!override) return base;
	return {
		...base,
		...override,
		colors: {
			...base.colors,
			...(override.colors ?? {}),
		},
		variables: {
			...base.variables,
			...(override.variables ?? {}),
		},
	};
}

// 讀取系統偏好（只用於「從未設定過」的首次初始化）
function detectSystemMode(): ThemeMode {
	if(typeof window === "undefined") return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// 初始化：先讀 localStorage；若無值則以 defaultTheme 決定：
// - "auto"：讀系統偏好
// - "light" / "dark"：直接使用
// 決定後立即寫回 localStorage，之後使用者切換再更新
function resolveInitialMode(storageKey: string, defaultTheme: ThemeMode | "auto"): ThemeMode {
	// 非 "light" / "dark" / "auto" 一律 fallback 到 auto
	const fallback: ThemeMode | "auto" =
		defaultTheme === "light" || defaultTheme === "dark" ? defaultTheme : "auto";
	if(typeof window === "undefined") {
		return fallback === "auto" ? "light" : fallback;
	}
	const stored = window.localStorage.getItem(storageKey);
	if(stored === "light" || stored === "dark") return stored;
	const initial: ThemeMode = fallback === "auto" ? detectSystemMode() : fallback;
	window.localStorage.setItem(storageKey, initial);
	return initial;
}

// 合併使用者覆寫進 Confucian blueprint
function buildMergedBlueprint(
	overrides: CreateConfucianOptions["overrides"],
	defaultTheme: "confucianLight" | "confucianDark"
) {
	return {
		...confucianBlueprint,
		theme: {
			defaultTheme,
			themes: {
				confucianLight: mergeThemeDefinition(confucianLight, overrides?.light),
				confucianDark: mergeThemeDefinition(confucianDark, overrides?.dark),
			},
		},
		defaults: {
			...confucianBlueprint.defaults,
			...(overrides?.defaults ?? {}),
		},
	};
}

export function createConfucian(opts: CreateConfucianOptions = {}) {
	const defaultTheme = opts.defaultTheme ?? "auto";
	const themeStorageKey = opts.themeStorageKey ?? "confucian-theme";
	const sidebarStorageKey = opts.sidebarStorageKey ?? "confucian-sidebar-collapsed";

	// 決定初始 Vuetify 主題名稱；
	// 若 localStorage 無值且 defaultTheme: "auto"，會讀系統偏好並寫回 storage，
	// 之後不再跟隨系統變化（由使用者 toggle 決定）
	const initialMode = resolveInitialMode(themeStorageKey, defaultTheme);
	const initialThemeName = initialMode === "dark" ? "confucianDark" : "confucianLight";

	// 立即把主題寫到 <html> 的 data attribute，讓 CSS 能在 root 設 color-scheme
	// （Vuetify 的 .v-theme-* 只到 v-application；表單元件、捲軸等原生 UI 需要從 root 才能套用）
	if(typeof document !== "undefined") {
		document.documentElement.dataset.confucianTheme = initialMode;
	}

	const mergedBlueprint = buildMergedBlueprint(opts.overrides, initialThemeName);

	// 建立 Vuetify 實例
	// 明示註冊所有 Vuetify 元件與 directive。因為 confucian-ui 是預編譯的 library，
	// 消費端的 webpack-plugin-vuetify auto-import 看不到我們的 dist，
	// 必須自行確保 VNavigationDrawer / VListGroup 等都被註冊
	const vuetify = createVuetify({
		blueprint: mergedBlueprint,
		components: ConfucianVuetifyComponents,
		directives: { Ripple },
		theme: {
			...mergedBlueprint.theme,
			defaultTheme: initialThemeName,
		},
		// 預設語系為台灣正體，可由 opts.locale 或 opts.vuetify.locale 覆寫
		locale: opts.locale ?? {
			locale: "zhHant",
			fallback: "en",
			messages: { zhHant, en },
		},
		...opts.vuetify,
	});

	const runtime: ConfucianRuntime = readonly(
		reactive({
			options: {
				themeStorageKey,
				sidebarStorageKey,
			},
		})
	) as ConfucianRuntime;

	return {
		vuetify,
		runtime,
		install(app: App) {
			app.use(vuetify);
			app.provide(CONFUCIAN_RUNTIME_KEY, runtime);
			installNativePickerDelegate();
		},
	};
}

// 提供 watch 匯出以便未來擴充測試
export { watch };
