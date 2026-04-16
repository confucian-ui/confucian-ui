<template>
	<div>
		<ConfucianPageHeader title="定價方案" subtitle="選擇最適合你的方案" />

		<div class="text-center mb-6">
			<v-btn-toggle v-model="cycle" color="secondary" mandatory density="comfortable" variant="outlined">
				<v-btn value="monthly">月付</v-btn>
				<v-btn value="yearly">年付（省 20%）</v-btn>
			</v-btn-toggle>
		</div>

		<v-row>
			<v-col v-for="(p, i) in plans" :key="i" cols="12" md="4">
				<v-card
					class="pa-6 h-100 d-flex flex-column"
					:color="p.recommended ? 'primary' : undefined"
					:variant="p.recommended ? 'tonal' : undefined"
				>
					<div class="d-flex align-center mb-2">
						<h3 class="text-headline-small confucian-heading">{{ p.name }}</h3>
						<v-chip v-if="p.recommended" size="small" class="ml-2" color="primary">推薦</v-chip>
					</div>
					<p class="text-body-medium text-medium-emphasis">{{ p.description }}</p>

					<div class="my-4">
						<span class="text-headline-large font-weight-medium">
							NT$ {{ cycle === "yearly" ? p.yearly : p.monthly }}
						</span>
						<span class="text-body-medium text-medium-emphasis">
							/ {{ cycle === "yearly" ? "年" : "月" }}
						</span>
					</div>

					<ConfucianBambooDivider />

					<v-list density="comfortable" bg-color="transparent" class="my-3">
						<v-list-item v-for="f in p.features" :key="f" prepend-icon="ph-check">
							<v-list-item-title>{{ f }}</v-list-item-title>
						</v-list-item>
					</v-list>

					<v-spacer />
					<v-btn :color="p.recommended ? 'primary' : undefined" :variant="p.recommended ? 'flat' : 'outlined'" block>
						選擇此方案
					</v-btn>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { ConfucianPageHeader, ConfucianBambooDivider } from "@confucian-ui/vuetify";

	const cycle = ref<"monthly" | "yearly">("monthly");

	const plans = [
		{
			name: "書院",
			description: "適合初入門的個人使用者",
			monthly: 290,
			yearly: 2784,
			features: ["3 個專案", "基本分析", "社群支援"],
			recommended: false,
		},
		{
			name: "講堂",
			description: "小型團隊之首選",
			monthly: 890,
			yearly: 8544,
			features: ["20 個專案", "進階分析", "優先客服", "整合 API"],
			recommended: true,
		},
		{
			name: "太學",
			description: "大型組織與機構",
			monthly: 2490,
			yearly: 23904,
			features: ["無限專案", "客製化儀表板", "專屬客戶經理", "SSO 整合", "自架部署"],
			recommended: false,
		},
	];
</script>
