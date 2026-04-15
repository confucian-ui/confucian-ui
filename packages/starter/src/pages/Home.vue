<template>
	<div>
		<ConfucianPageHeader title="歡迎使用 Confucian" subtitle="這是起始範本，請從此處開始擴充" />

		<v-row>
			<v-col cols="12" md="8" offset-md="2">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-3">開始你的專案</h3>
					<p class="text-body-medium text-medium-emphasis mb-4">
						Confucian 已為你準備好基本的主題、側欄與佈局。請從 <code>src/router/index.ts</code> 開始加入路由，
						於 <code>src/pages/</code> 新增頁面，並於 <code>src/router/menu.ts</code> 中同步更新側欄選單。
					</p>

					<ConfucianBambooDivider />

					<div class="d-flex flex-wrap ga-2">
						<v-btn color="primary" variant="flat" prepend-icon="ph-book-open">
							閱讀文件
						</v-btn>
						<v-btn variant="outlined" prepend-icon="ph-github-logo">
							查看原始碼
						</v-btn>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts">
	import { ConfucianPageHeader, ConfucianBambooDivider } from "@confucian-ui/vuetify";
</script>
