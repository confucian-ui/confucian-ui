<template>
	<div>
		<ConfucianPageHeader title="回饋與載入" subtitle="Skeleton Loader、Timeline" />

		<v-row>
			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">Skeleton Loader</h3>
					<p class="text-body-medium text-medium-emphasis mb-4">
						載入中的佔位元件，避免 layout shift。
					</p>
					<v-skeleton-loader type="card" class="mb-4" />
					<v-skeleton-loader type="list-item-avatar-two-line" class="mb-2" />
					<v-skeleton-loader type="list-item-avatar-two-line" class="mb-2" />
					<v-skeleton-loader type="list-item-avatar-two-line" />
				</v-card>
			</v-col>

			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">Skeleton — 文章佔位</h3>
					<p class="text-body-medium text-medium-emphasis mb-4">
						模擬文章頁面的載入骨架。
					</p>
					<v-skeleton-loader type="article, actions" />
				</v-card>
			</v-col>

			<v-col cols="12">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">時間軸</h3>
					<p class="text-body-medium text-medium-emphasis mb-4">
						v-timeline：以時間線呈現事件序列。
					</p>
					<v-timeline side="end" density="compact">
						<v-timeline-item
							v-for="event in events"
							:key="event.id"
							:dot-color="event.color"
							size="small"
						>
							<template #opposite>
								<span class="text-body-small text-medium-emphasis">{{ event.date }}</span>
							</template>
							<v-card class="pa-4" variant="tonal" :color="event.color">
								<div class="d-flex align-center ga-2 mb-1">
									<v-icon :icon="event.icon" size="18" />
									<strong>{{ event.title }}</strong>
								</div>
								<p class="text-body-small mb-0">{{ event.description }}</p>
							</v-card>
						</v-timeline-item>
					</v-timeline>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts">
	import { ConfucianPageHeader } from "@confucian-ui/vuetify";

	const events = [
		{
			id: 1,
			title: "專案建立",
			description: "Confucian 佈景主題的初始版本建立，確立竹黃褐色系與宣紙底色。",
			date: "2026-03-01",
			color: "primary",
			icon: "ph-flag",
		},
		{
			id: 2,
			title: "元件設計完成",
			description: "Layout、Sidebar、AppBar、Footer 等核心元件完成設計與開發。",
			date: "2026-03-15",
			color: "accent",
			icon: "ph-puzzle-piece",
		},
		{
			id: 3,
			title: "圖示系統遷移",
			description: "從 Tabler Icons 遷移至 Phosphor Icons duotone，取中庸之意。",
			date: "2026-04-10",
			color: "success",
			icon: "ph-swap",
		},
		{
			id: 4,
			title: "首次公開發布",
			description: "v0.1.0 發布至 npm，同時上線 demo 站與 GitHub Pages。",
			date: "2026-04-16",
			color: "warning",
			icon: "ph-rocket-launch",
		},
	];
</script>
