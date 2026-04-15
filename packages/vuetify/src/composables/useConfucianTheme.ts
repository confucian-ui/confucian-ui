import { computed, inject, ref, watch } from "vue";
import { useTheme } from "vuetify";

import { CONFUCIAN_RUNTIME_KEY } from "../createConfucian";

import type { ThemeMode } from "../types/sidebar";

// 偵測系統偏好，供「首次初始化」使用
function detectSystemMode(): ThemeMode {
	if(typeof window === "undefined") return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// 讀取 localStorage；若無值則以系統偏好為初值並「立即寫回」，之後不再讀系統
function loadOrInitMode(storageKey: string): ThemeMode {
	if(typeof window === "undefined") return "light";
	const v = window.localStorage.getItem(storageKey);
	if(v === "light" || v === "dark") return v;
	const initial = detectSystemMode();
	window.localStorage.setItem(storageKey, initial);
	return initial;
}

function resolveTheme(m: ThemeMode): "confucianLight" | "confucianDark" {
	return m === "dark" ? "confucianDark" : "confucianLight";
}

// Confucian 主題切換 composable
// - 只有 "light" / "dark" 兩種最終模式
// - 首次使用時以系統偏好決定初值、寫入 localStorage；之後不再跟隨系統
// - 後續切換以使用者操作為準，永續於 localStorage
export function useConfucianTheme() {
	const vuetifyTheme = useTheme();
	const runtime = inject(CONFUCIAN_RUNTIME_KEY, null);
	const storageKey = runtime?.options.themeStorageKey ?? "confucian-theme";

	const mode = ref<ThemeMode>(loadOrInitMode(storageKey));
	const isDark = computed(() => vuetifyTheme.current.value.dark);

	watch(mode, m => {
		if(typeof window !== "undefined") {
			window.localStorage.setItem(storageKey, m);
		}
		if(typeof document !== "undefined") {
			document.documentElement.dataset.confucianTheme = m;
		}
		vuetifyTheme.change(resolveTheme(m));
	});

	const setMode = (m: ThemeMode) => { mode.value = m; };
	const toggle = () => { mode.value = mode.value === "light" ? "dark" : "light"; };

	return {
		mode,
		isDark,
		setMode,
		toggle,
	};
}
