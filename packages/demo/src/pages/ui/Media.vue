<template>
	<div>
		<ConfucianPageHeader title="媒體與展示" subtitle="Carousel、Parallax、Calendar" />

		<v-row>
			<v-col cols="12">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">輪播</h3>
					<p class="text-body-medium text-medium-emphasis mb-4">
						v-carousel：自動輪播或手動切換的圖片/內容區塊。
					</p>
					<v-carousel height="300" show-arrows="hover" cycle hide-delimiter-background>
						<v-carousel-item v-for="slide in slides" :key="slide.title">
							<div
								class="d-flex flex-column align-center justify-center fill-height"
								:style="{ background: slide.gradient }"
							>
								<v-icon :icon="slide.icon" size="64" color="white" class="mb-3" />
								<h3 class="text-headline-small text-white confucian-heading">{{ slide.title }}</h3>
								<p class="text-body-medium text-white mt-1" style="opacity: 0.85">{{ slide.subtitle }}</p>
							</div>
						</v-carousel-item>
					</v-carousel>
				</v-card>
			</v-col>

			<v-col cols="12">
				<v-card>
					<h3 class="text-title-large pa-6 mb-0">視差滾動</h3>
					<p class="text-body-medium text-medium-emphasis px-6 mb-4">
						v-parallax：搭配竹林背景的視差捲動效果。
					</p>
					<v-parallax :src="bambooForestUrl" height="300">
						<div
							class="d-flex flex-column align-center justify-center fill-height"
							style="background: rgba(0, 0, 0, 0.35);"
						>
							<h2 class="text-display-small text-white confucian-heading">君子務本</h2>
							<p class="text-body-large text-white mt-2" style="opacity: 0.85">本立而道生</p>
						</div>
					</v-parallax>
				</v-card>
			</v-col>

			<v-col cols="12">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">月曆</h3>
					<p class="text-body-medium text-medium-emphasis mb-4">
						v-calendar：事件排程的月曆視圖。搭配控制項切換月份與檢視模式。
					</p>
					<div class="d-flex align-center justify-space-between mb-4">
						<v-btn variant="text" icon="ph-caret-left" @click="calendarRef?.prev?.()" />
						<h4 class="text-title-medium confucian-heading">{{ calendarTitle }}</h4>
						<v-btn variant="text" icon="ph-caret-right" @click="calendarRef?.next?.()" />
					</div>
					<v-btn-toggle
						v-model="calendarView"
						mandatory
						color="primary"
						variant="outlined"
						density="comfortable"
						class="mb-4"
					>
						<v-btn value="month">月</v-btn>
						<v-btn value="week">週</v-btn>
						<v-btn value="day">日</v-btn>
					</v-btn-toggle>
					<v-calendar
						ref="calendarRef"
						v-model="calendarDate"
						:type="calendarView"
						:events="calendarEvents"
						event-name="title"
						color="primary"
					/>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts">
	import { computed, ref, useTemplateRef } from "vue";
	import { ConfucianPageHeader } from "@confucian-ui/vuetify";

	import bambooForestUrl from "../../assets/bamboo-forest.jpg";

	import type { VCalendar } from "vuetify/components/VCalendar";

	const slides = [
		{
			title: "攤開的宣紙",
			subtitle: "淺色模式 — 日光下的書桌",
			icon: "ph-sun",
			gradient: "linear-gradient(135deg, #C8833F 0%, #D9A877 100%)",
		},
		{
			title: "深夜的書齋",
			subtitle: "深色模式 — 燭光下的黑檀木",
			icon: "ph-moon-stars",
			gradient: "linear-gradient(135deg, #2D363D 0%, #211215 100%)",
		},
		{
			title: "Duotone 之美",
			subtitle: "Phosphor duotone 圖示取中庸之意",
			icon: "ph-yin-yang",
			gradient: "linear-gradient(135deg, #6B5344 0%, #4A7C59 100%)",
		},
	];

	const calendarRef = useTemplateRef<InstanceType<typeof VCalendar>>("calendarRef");
	const calendarView = ref("month" as VCalendar["$props"]["type"]);
	const calendarDate = ref<Date | string>(new Date());
	const calendarTitle = computed(() => {
		const raw = calendarDate.value;
		const d = raw instanceof Date ? raw : new Date(raw);
		if(isNaN(d.getTime())) return "";
		return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月`;
	});
	// 以當前日期為基準產生範例事件，確保任何時間開啟 demo 都看得到
	function eventDate(dayOffset: number, hour: number): Date {
		const now = new Date();
		return new Date(now.getFullYear(), now.getMonth(), now.getDate() + dayOffset, hour);
	}

	const calendarEvents = ref([
		{
			title: "團隊週會",
			start: eventDate(0, 10),
			end: eventDate(0, 11),
			color: "primary",
		},
		{
			title: "產品評審",
			start: eventDate(2, 14),
			end: eventDate(2, 16),
			color: "accent",
		},
		{
			title: "版本發布",
			start: eventDate(5, 9),
			end: eventDate(5, 10),
			color: "success",
		},
		{
			title: "客戶拜訪",
			start: eventDate(8, 13),
			end: eventDate(8, 15),
			color: "warning",
		},
	]);
</script>
