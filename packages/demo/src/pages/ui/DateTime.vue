<template>
	<div>
		<ConfucianPageHeader title="日期時間" subtitle="日期選擇器與時間相關元件" />

		<v-row>
			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">日期輸入欄</h3>
					<p class="text-body-medium text-medium-emphasis mb-4">
						搭配 prepend-icon 的簡單日期輸入欄。
					</p>
					<v-text-field
						v-model="singleDate"
						label="出生日期"
						type="date"
						prepend-inner-icon="$calendar"
					/>
					<v-text-field
						v-model="singleTime"
						label="提醒時間"
						type="time"
						prepend-inner-icon="$confucian-clock"
					/>
				</v-card>
			</v-col>

			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">日期範圍選擇</h3>
					<p class="text-body-medium text-medium-emphasis mb-4">
						兩個欄位配對使用，用於報表查詢等情境。
					</p>
					<v-row>
						<v-col cols="6">
							<v-text-field
								v-model="rangeStart"
								label="起始日"
								type="date"
								prepend-inner-icon="$calendar"
							/>
						</v-col>
						<v-col cols="6">
							<v-text-field
								v-model="rangeEnd"
								label="結束日"
								type="date"
								prepend-inner-icon="$calendar"
							/>
						</v-col>
					</v-row>
					<v-chip
						v-if="rangeSummary"
						color="primary"
						variant="tonal"
						size="small"
					>
						{{ rangeSummary }}
					</v-chip>
				</v-card>
			</v-col>

			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">日期選擇器</h3>
					<p class="text-body-medium text-medium-emphasis mb-4">
						Vuetify v-date-picker：行事曆視覺化選擇。
					</p>
					<v-date-picker v-model="pickedDate" show-adjacent-months color="primary" />
					<div class="mt-3 text-body-medium">
						已選：<strong>{{ formattedPicked || "無" }}</strong>
					</div>
				</v-card>
			</v-col>

			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">預約對話框</h3>
					<p class="text-body-medium text-medium-emphasis mb-4">
						日期選擇器搭配對話框，用於預約、建立事件等流程。
					</p>
					<v-btn color="primary" prepend-icon="$calendar" @click="bookingOpen = true">
						選擇預約日期
					</v-btn>
					<div v-if="bookingDate" class="mt-3 text-body-medium">
						已預約：<strong>{{ bookingDate }}</strong>
						<span v-if="bookingTime"> {{ bookingTime }}</span>
					</div>

					<v-dialog v-model="bookingOpen" max-width="360">
						<v-card class="pa-4">
							<h3 class="text-title-large confucian-heading mb-3">選擇預約時間</h3>
							<v-date-picker
								v-model="tempDate"
								show-adjacent-months
								color="primary"
								hide-header
								class="confucian-date-picker--embedded"
							/>
							<v-text-field
								v-model="tempTime"
								label="時段"
								type="time"
								class="mt-3"
								prepend-inner-icon="$confucian-clock"
							/>
							<div class="d-flex justify-end ga-2 mt-2">
								<v-btn variant="text" @click="bookingOpen = false">取消</v-btn>
								<v-btn color="primary" variant="flat" @click="confirmBooking">確認</v-btn>
							</div>
						</v-card>
					</v-dialog>
				</v-card>
			</v-col>

			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">時間選擇器</h3>
					<p class="text-body-medium text-medium-emphasis mb-4">
						v-time-picker：類比鐘面式時間選擇，支援 12 / 24 小時制。
					</p>
					<v-time-picker
						v-model="pickedTime"
						format="24hr"
						color="primary"
					/>
					<div class="mt-3 text-body-medium">
						已選：<strong>{{ pickedTime || "無" }}</strong>
					</div>
				</v-card>
			</v-col>

			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<div class="d-flex align-center mb-4">
						<h3 class="text-title-large">日期輸入元件</h3>
						<v-chip size="x-small" color="warning" variant="tonal" class="ml-2">
							實驗性
						</v-chip>
					</div>
					<p class="text-body-medium text-medium-emphasis mb-4">
						v-date-input（labs）：輸入欄與行事曆 popup 一體；內建解析、驗證。
					</p>
					<v-date-input
						v-model="dateInputValue"
						label="活動日期"
						prepend-icon=""
						prepend-inner-icon="$calendar"
					/>
					<v-date-input
						v-model="dateRangeValue"
						label="日期區間"
						multiple="range"
						prepend-icon=""
						prepend-inner-icon="$calendar"
						class="mt-2"
					/>
				</v-card>
			</v-col>

			<v-col cols="12">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">近期事件</h3>
					<p class="text-body-medium text-medium-emphasis mb-4">
						以相對時間（幾分鐘前 / 小時前）呈現的列表。
					</p>
					<v-list density="comfortable" bg-color="transparent">
						<v-list-item
							v-for="event in events"
							:key="event.id"
							:prepend-icon="event.icon"
						>
							<v-list-item-title>{{ event.title }}</v-list-item-title>
							<v-list-item-subtitle>
								{{ event.time }} · {{ event.relative }}
							</v-list-item-subtitle>
						</v-list-item>
					</v-list>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts">
	import { computed, ref } from "vue";
	import { ConfucianPageHeader } from "@confucian-ui/vuetify";
	// VDateInput 仍在 labs，需從 vuetify/labs 個別匯入註冊
	import { VDateInput } from "vuetify/labs/VDateInput";

	const singleDate = ref("2026-04-14");
	const singleTime = ref("09:30");
	const pickedTime = ref<string | null>("09:30");
	const dateInputValue = ref<Date | null>(new Date());
	const dateRangeValue = ref<Date[]>([]);

	const rangeStart = ref("2026-04-01");
	const rangeEnd = ref("2026-04-14");
	const rangeSummary = computed(() => {
		if(!rangeStart.value || !rangeEnd.value) return "";
		return `${rangeStart.value} ~ ${rangeEnd.value}`;
	});

	const pickedDate = ref<Date | null>(new Date());
	const formattedPicked = computed(() => {
		if(!pickedDate.value) return "";
		const d = pickedDate.value;
		return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
	});

	const bookingOpen = ref(false);
	const tempDate = ref<Date | null>(null);
	const tempTime = ref("10:00");
	const bookingDate = ref("");
	const bookingTime = ref("");

	const confirmBooking = () => {
		if(tempDate.value) {
			const d = tempDate.value;
			bookingDate.value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
			bookingTime.value = tempTime.value;
		}
		bookingOpen.value = false;
	};

	const events = [
		{ id: 1, title: "王雅雯 完成訂單 #10284", time: "2026-04-14 09:32", relative: "2 分鐘前", icon: "ph-check" },
		{ id: 2, title: "新使用者 李謙 註冊", time: "2026-04-14 09:16", relative: "18 分鐘前", icon: "ph-user-plus" },
		{ id: 3, title: "庫存警示：竹簡組合包", time: "2026-04-14 08:34", relative: "1 小時前", icon: "ph-warning" },
		{ id: 4, title: "系統完成備份", time: "2026-04-14 06:30", relative: "3 小時前", icon: "ph-database" },
	];
</script>
