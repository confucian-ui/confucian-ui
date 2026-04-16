<template>
	<div>
		<ConfucianPageHeader title="儀表板" subtitle="近七日的綜合概覽">
			<template #actions>
				<v-btn color="primary" variant="flat" prepend-icon="ph-download-simple">
					匯出報表
				</v-btn>
			</template>
		</ConfucianPageHeader>

		<!-- KPI 卡片列 -->
		<v-row>
			<v-col v-for="kpi in kpis" :key="kpi.label" cols="12" sm="6" md="3">
				<v-card class="pa-4 confucian-card--emphasis">
					<div class="d-flex align-center justify-space-between mb-2">
						<span class="text-title-medium text-medium-emphasis">{{ kpi.label }}</span>
						<v-icon :icon="kpi.icon" :color="kpi.color" />
					</div>
					<div class="text-headline-small font-weight-medium">{{ kpi.value }}</div>
					<div class="text-body-small" :class="kpi.trend >= 0 ? 'text-success' : 'text-error'">
						{{ kpi.trend >= 0 ? "+" : "" }}{{ kpi.trend }}% 相較於前週
					</div>
				</v-card>
			</v-col>
		</v-row>

		<!-- 圖表與列表 -->
		<v-row>
			<v-col cols="12" md="8">
				<v-card class="pa-4">
					<div class="d-flex align-center justify-space-between mb-3">
						<h3 class="text-title-large font-weight-medium">訂單趨勢</h3>
						<v-btn-toggle v-model="range" color="secondary" mandatory density="comfortable" variant="outlined">
							<v-btn value="7">7 日</v-btn>
							<v-btn value="30">30 日</v-btn>
							<v-btn value="90">90 日</v-btn>
						</v-btn-toggle>
					</div>
					<apexchart type="area" height="280" :options="chartOptions" :series="chartSeries" />
				</v-card>
			</v-col>

			<v-col cols="12" md="4">
				<v-card class="pa-4">
					<h3 class="text-title-large font-weight-medium mb-3">近期活動</h3>
					<v-list density="comfortable" lines="two">
						<v-list-item v-for="(a, i) in activities" :key="i">
							<template #prepend>
								<v-avatar :color="a.color" size="36">
									<v-icon :icon="a.icon" color="white" />
								</v-avatar>
							</template>
							<v-list-item-title>{{ a.title }}</v-list-item-title>
							<v-list-item-subtitle>{{ a.time }}</v-list-item-subtitle>
						</v-list-item>
					</v-list>
				</v-card>
			</v-col>
		</v-row>

		<!-- 最新訂單 -->
		<v-row>
			<v-col cols="12">
				<v-card class="pa-4">
					<h3 class="text-title-large font-weight-medium mb-3">最新訂單</h3>
					<v-data-table
						:headers="orderHeaders"
						:items="recentOrders"
						density="comfortable"
						:items-per-page="5"
					>
						<template #[`item.status`]="{ item }">
							<v-chip :color="statusColor(item.status)" size="small" variant="tonal">
								{{ item.status }}
							</v-chip>
						</template>
						<template #[`item.amount`]="{ item }">
							NT$ {{ item.amount.toLocaleString() }}
						</template>
					</v-data-table>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed } from "vue";
	import VueApexCharts from "vue3-apexcharts";
	import { useTheme } from "vuetify";
	import { ConfucianPageHeader } from "@confucian-ui/vuetify";

	import type { ApexOptions } from "apexcharts";

	const apexchart = VueApexCharts;
	const theme = useTheme();

	const kpis = ref([
		{ label: "本月營收", value: "NT$ 842,100", trend: 12.4, icon: "ph-coins", color: "primary" },
		{ label: "新增訂單", value: "1,248", trend: 8.1, icon: "ph-shopping-cart", color: "accent" },
		{ label: "活躍使用者", value: "3,924", trend: 3.2, icon: "ph-users", color: "success" },
		{ label: "退款率", value: "1.4%", trend: -0.6, icon: "ph-arrows-clockwise", color: "warning" },
	]);

	const range = ref("7");

	const makeSeriesData = (r: string): number[] => {
		if(r === "7") return [42, 55, 38, 68, 72, 85, 61];
		if(r === "30") return Array.from({ length: 30 }, (_, i) => Math.round(40 + Math.sin(i / 3) * 20 + i * 1.2));
		return Array.from({ length: 12 }, (_, i) => Math.round(50 + Math.cos(i / 2) * 25 + i * 2));
	};

	const chartSeries = computed(() => [
		{
			name: "訂單金額",
			data: makeSeriesData(range.value),
		},
	]);

	const chartOptions = computed(() => ({
		chart: {
			toolbar: { show: false },
			fontFamily: "inherit",
			foreColor: theme.current.value.colors["on-surface"],
		},
		colors: [theme.current.value.colors.primary],
		dataLabels: { enabled: false },
		stroke: { curve: "smooth", width: 2.5 },
		fill: {
			type: "gradient",
			gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.05 },
		},
		grid: {
			borderColor: theme.current.value.variables["border-color"] as string,
			strokeDashArray: 3,
		},
		xaxis: {
			categories: range.value === "7" ?
				["週一", "週二", "週三", "週四", "週五", "週六", "週日"] :
				Array.from({ length: range.value === "30" ? 30 : 12 }, (_, i) =>
					range.value === "30" ? `${i + 1}` : `第 ${i + 1} 週`
				),
		},
		tooltip: { theme: theme.current.value.dark ? "dark" : "light" },
	} as ApexOptions));

	const activities = ref([
		{ title: "王雅雯 完成訂單 #10284", time: "2 分鐘前", icon: "ph-check", color: "success" },
		{ title: "新使用者 李謙 註冊", time: "18 分鐘前", icon: "ph-user-plus", color: "primary" },
		{ title: "庫存警示：竹簡組合包", time: "1 小時前", icon: "ph-warning", color: "warning" },
		{ title: "系統完成備份", time: "3 小時前", icon: "ph-database", color: "accent" },
	]);

	const orderHeaders = [
		{ title: "訂單編號", key: "id" },
		{ title: "客戶", key: "customer" },
		{ title: "狀態", key: "status" },
		{ title: "金額", key: "amount", align: "end" as const },
		{ title: "日期", key: "date" },
	];

	const recentOrders = ref([
		{ id: "#10284", customer: "王雅雯", status: "已完成", amount: 2480, date: "2026-04-13" },
		{ id: "#10283", customer: "陳建宏", status: "處理中", amount: 1560, date: "2026-04-13" },
		{ id: "#10282", customer: "林佳玲", status: "已完成", amount: 4200, date: "2026-04-12" },
		{ id: "#10281", customer: "張志遠", status: "已取消", amount: 980, date: "2026-04-12" },
		{ id: "#10280", customer: "黃美琪", status: "已完成", amount: 3150, date: "2026-04-11" },
	]);

	const statusColor = (s: string): string => {
		if(s === "已完成") return "success";
		if(s === "處理中") return "primary";
		if(s === "已取消") return "error";
		return "default";
	};
</script>
