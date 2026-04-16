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
 *
 * Tooltip 顏色不在這裡處理：ApexCharts 的 tooltip.theme 是初始化時固定的，
 * 主題切換後不會跟著變。改在 styles/_apexcharts.scss 用 CSS variable 覆蓋，
 * 主題切換即時反映。
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
	}));
}
