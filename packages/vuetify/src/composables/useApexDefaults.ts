import { computed } from "vue";
import { useTheme } from "vuetify";

import type { ComputedRef } from "vue";

/**
 * ApexCharts 的主題感知預設 options。
 *
 * 會根據當前 Vuetify 主題提供：
 * - `chart.foreColor`：文字 / 座標軸色（跟隨 on-surface）
 * - `chart.fontFamily`：inherit，吃到外層 font
 * - `grid.borderColor`：使用主題的 border-color variable
 * - `tooltip.theme`：light / dark 自動切換
 *
 * 消費端範例：
 * ```ts
 * const apexDefaults = useApexDefaults();
 * const barOptions = computed(() => ({
 *     ...apexDefaults.value,
 *     colors: [...],
 *     xaxis: { categories: [...] },
 * }));
 * ```
 *
 * 回傳的是 `ComputedRef`，主題切換時會自動更新；圖表元件搭配 Vue 的 reactivity 可自動重畫。
 */
export interface ApexDefaults {
	chart: {
		toolbar: { show: boolean };
		fontFamily: string;
		foreColor: string;
	};
	grid: {
		borderColor: string;
		strokeDashArray: number;
	};
	tooltip: {
		theme: "light" | "dark";
	};
}

export function useApexDefaults(): ComputedRef<ApexDefaults> {
	const theme = useTheme();

	return computed(() => ({
		chart: {
			toolbar: { show: false },
			fontFamily: "inherit",
			foreColor: theme.current.value.colors["on-surface"] as string,
		},
		grid: {
			borderColor: theme.current.value.variables["border-color"] as string,
			strokeDashArray: 3,
		},
		tooltip: {
			theme: theme.current.value.dark ? "dark" : "light",
		},
	}));
}
