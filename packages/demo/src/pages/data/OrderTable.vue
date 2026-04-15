<template>
	<div>
		<ConfucianPageHeader title="訂單" subtitle="所有訂單之詳細記錄">
			<template #actions>
				<v-btn variant="outlined" prepend-icon="ph-funnel">篩選</v-btn>
				<v-btn color="primary" variant="flat" prepend-icon="ph-download-simple">匯出</v-btn>
			</template>
		</ConfucianPageHeader>

		<v-card>
			<v-data-table
				:headers="headers"
				:items="orders"
				:items-per-page="15"
				show-select
			>
				<template #[`item.status`]="{ item }">
					<v-chip :color="statusColor(item.status)" size="small" variant="tonal">
						{{ item.status }}
					</v-chip>
				</template>
				<template #[`item.amount`]="{ item }">
					NT$ {{ item.amount.toLocaleString() }}
				</template>
				<template #[`item.actions`]>
					<v-btn variant="text" icon size="small">
						<v-icon icon="ph-eye" />
					</v-btn>
				</template>
			</v-data-table>
		</v-card>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { ConfucianPageHeader } from "@confucian-ui/vuetify";

	const headers = [
		{ title: "訂單編號", key: "id" },
		{ title: "客戶", key: "customer" },
		{ title: "商品", key: "items" },
		{ title: "狀態", key: "status" },
		{ title: "金額", key: "amount", align: "end" as const },
		{ title: "付款方式", key: "payment" },
		{ title: "日期", key: "date" },
		{ title: "", key: "actions", align: "end" as const, sortable: false },
	];

	const statuses = ["已完成", "處理中", "待付款", "已取消"];
	const customers = ["王雅雯", "陳建宏", "林佳玲", "張志遠", "黃美琪", "李謙", "蔡佩珊", "吳信宏"];
	const payments = ["信用卡", "ATM 轉帳", "LINE Pay", "貨到付款"];

	const orders = ref(
		Array.from({ length: 42 }, (_, i) => ({
			id: `#${10300 - i}`,
			customer: customers[i % customers.length],
			items: `${(i % 4) + 1} 項商品`,
			status: statuses[i % statuses.length],
			amount: 500 + ((i * 137) % 8500),
			payment: payments[i % payments.length],
			date: `2026-04-${String(14 - (i % 14)).padStart(2, "0")}`,
		}))
	);

	const statusColor = (s: string) => {
		if(s === "已完成") return "success";
		if(s === "處理中") return "primary";
		if(s === "待付款") return "warning";
		if(s === "已取消") return "error";
		return "default";
	};
</script>
