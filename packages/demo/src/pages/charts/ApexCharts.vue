<template>
	<div>
		<ConfucianPageHeader title="圖表" subtitle="ApexCharts 的幾個典型範例" />

		<v-row>
			<v-col cols="12" md="6">
				<v-card class="pa-5 h-100">
					<h3 class="text-title-large mb-3">柱狀圖 — 各部門月度預算</h3>
					<apexchart type="bar" height="300" :options="barOptions" :series="barSeries" />
				</v-card>
			</v-col>
			<v-col cols="12" md="6">
				<v-card class="pa-5 h-100">
					<h3 class="text-title-large mb-3">折線圖 — 年度訂單數</h3>
					<apexchart type="line" height="300" :options="lineOptions" :series="lineSeries" />
				</v-card>
			</v-col>
			<v-col cols="12" md="6">
				<v-card class="pa-5 h-100">
					<h3 class="text-title-large mb-3">甜甜圈 — 產品類別佔比</h3>
					<apexchart type="donut" height="300" :options="donutOptions" :series="donutSeries" />
				</v-card>
			</v-col>
			<v-col cols="12" md="6">
				<v-card class="pa-5 h-100">
					<h3 class="text-title-large mb-3">雷達圖 — 五德評估</h3>
					<apexchart type="radar" height="300" :options="radarOptions" :series="radarSeries" />
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts">
	import { computed } from "vue";
	import VueApexCharts from "vue3-apexcharts";
	import { useTheme } from "vuetify";
	import { ConfucianPageHeader, useApexDefaults } from "@confucian-ui/vuetify";

	import { deepMerge } from "@/utils/deepMerge";

	import type { ApexOptions } from "apexcharts";

	const apexchart = VueApexCharts;
	const theme = useTheme();
	const baseOptions = useApexDefaults();

	const palette = computed(() => [
		theme.current.value.colors.primary,
		theme.current.value.colors.accent,
		theme.current.value.colors.warning,
		theme.current.value.colors.success,
		theme.current.value.colors.secondary,
	]);

	const barSeries = [{ name: "預算", data: [44, 55, 57, 56, 61, 58] }];
	const barOptions = computed(() => ({
		...baseOptions.value,
		colors: [theme.current.value.colors.primary],
		plotOptions: { bar: { columnWidth: "45%", borderRadius: 3 } },
		dataLabels: { enabled: false },
		xaxis: { categories: ["產品", "工程", "設計", "行銷", "客服", "財務"] },
	}));

	const lineSeries = [
		{ name: "2025", data: [210, 380, 300, 520, 420, 680, 720, 600, 750, 840, 720, 900] },
		{ name: "2026", data: [240, 410, 360, 580, 510, 720, 820, 710, 890, 960, 880, 1050] },
	];
	const lineOptions = computed(() => deepMerge<ApexOptions>(baseOptions.value, {
		chart: {
			zoom: { enabled: false },
		},
		colors: palette.value.slice(0, 2),
		dataLabels: { enabled: false },
		stroke: { curve: "smooth", width: 2.5 },
		xaxis: { categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] },
	}));

	const donutSeries = [44, 32, 20, 14];
	const donutOptions = computed(() => ({
		...baseOptions.value,
		colors: palette.value,
		labels: ["書籍", "文具", "茶器", "飾品"],
		legend: { position: "bottom" },
	} as ApexOptions));

	const radarSeries = [{ name: "評分", data: [80, 90, 75, 85, 70] }];
	const radarOptions = computed(() => ({
		...baseOptions.value,
		colors: [theme.current.value.colors.primary],
		xaxis: { categories: ["仁", "義", "禮", "智", "信"] },
	} as ApexOptions));
</script>
