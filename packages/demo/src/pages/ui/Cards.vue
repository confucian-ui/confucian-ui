<template>
	<div>
		<ConfucianPageHeader title="卡片" subtitle="各式 v-card 應用範例" />

		<v-row>
			<v-col cols="12" md="4">
				<v-card class="pa-5">
					<h3 class="text-title-large font-weight-medium">基本卡片</h3>
					<p class="text-body-medium text-medium-emphasis mt-2 mb-4">
						最簡單的卡片：細邊框、3px 圓角、hover 時邊框變色。
					</p>
					<v-btn color="primary" variant="tonal" block>了解更多</v-btn>
				</v-card>
			</v-col>

			<v-col cols="12" md="4">
				<v-card>
					<v-img height="160" gradient="to bottom, rgb(200,131,63), rgb(107,83,68)">
						<div class="d-flex align-center justify-center fill-height">
							<h3 class="text-headline-small text-white confucian-heading">有圖媒體</h3>
						</div>
					</v-img>
					<v-card-text>
						<p class="text-body-medium">
							頂部以色彩漸層取代圖片，避免引入任何第三方圖像資產。
						</p>
					</v-card-text>
					<v-card-actions>
						<v-btn variant="text" color="primary">動作</v-btn>
						<v-spacer />
						<LikeButton />
						<v-btn variant="text" icon><v-icon icon="ph-share-network" /></v-btn>
					</v-card-actions>
				</v-card>
			</v-col>

			<v-col cols="12" md="4">
				<v-card class="pa-5">
					<div class="d-flex align-center mb-3">
						<v-avatar color="primary" size="40">
							<span class="text-white font-weight-medium">王</span>
						</v-avatar>
						<div class="ml-3">
							<div class="font-weight-medium">王雅雯</div>
							<div class="text-body-small text-medium-emphasis">產品經理 · 2 小時前</div>
						</div>
					</div>
					<p class="text-body-medium">
						「學而不思則罔，思而不學則殆。」此次迭代之重點不在速度，而在方向。
					</p>
					<ConfucianBambooDivider />
					<div class="d-flex justify-space-between">
						<LikeButton :count="12" />
						<v-btn variant="text" size="small" prepend-icon="ph-chat-circle">3</v-btn>
						<v-btn variant="text" size="small" prepend-icon="ph-share-network">分享</v-btn>
					</div>
				</v-card>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12" md="6">
				<v-card class="pa-5" color="primary" variant="tonal">
					<h3 class="text-title-large font-weight-medium">強調卡片</h3>
					<p class="text-body-medium mt-2 mb-0">
						使用 variant="tonal" 搭配 primary 色，適合用於重點資訊或行動呼籲。
					</p>
				</v-card>
			</v-col>
			<v-col cols="12" md="6">
				<v-card class="pa-5" variant="outlined">
					<h3 class="text-title-large font-weight-medium">純邊框卡片</h3>
					<p class="text-body-medium mt-2 mb-0">
						variant="outlined" 無背景填滿，視覺最為克制。
					</p>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts">
	import { ConfucianPageHeader, ConfucianBambooDivider } from "@confucian-ui/vuetify";

	import LikeButton from "../../components/LikeButton.vue";
</script>
