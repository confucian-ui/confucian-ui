<template>
	<div>
		<ConfucianPageHeader title="個人資料" subtitle="帳號資訊與偏好設定" />

		<v-row>
			<v-col cols="12" md="4">
				<v-card class="pa-6 text-center">
					<v-avatar color="primary" size="96" class="mb-3">
						<span class="text-display-small text-white">王</span>
					</v-avatar>
					<h3 class="text-title-large mt-2">王雅雯</h3>
					<div class="text-body-small text-medium-emphasis">產品經理 · 產品部</div>

					<ConfucianBambooDivider />

					<v-list density="comfortable" bg-color="transparent">
						<v-list-item prepend-icon="ph-envelope" title="yaven@example.com" />
						<v-list-item prepend-icon="ph-phone" title="+886 912 345 678" />
						<v-list-item prepend-icon="ph-map-pin" title="台北市信義區" />
					</v-list>

					<v-btn color="primary" variant="tonal" block class="mt-4" prepend-icon="$edit">
						編輯個人資料
					</v-btn>
				</v-card>
			</v-col>

			<v-col cols="12" md="8">
				<v-card class="pa-6">
					<v-tabs v-model="tab" color="primary">
						<v-tab value="account">帳號</v-tab>
						<v-tab value="security">安全性</v-tab>
						<v-tab value="notifications">通知</v-tab>
					</v-tabs>

					<ConfucianBambooDivider />

					<v-tabs-window v-model="tab">
						<v-tabs-window-item value="account">
							<v-row>
								<v-col cols="12" md="6"><v-text-field label="顯示名稱" model-value="王雅雯" /></v-col>
								<v-col cols="12" md="6"><v-text-field label="使用者名稱" model-value="yaven" /></v-col>
								<v-col cols="12"><v-textarea label="個人簡介" rows="3" model-value="致力於讓產品同時有效率與雅致。" /></v-col>
								<v-col cols="12"><v-btn color="primary">儲存變更</v-btn></v-col>
							</v-row>
						</v-tabs-window-item>

						<v-tabs-window-item value="security">
							<v-row>
								<v-col cols="12" md="6"><v-text-field label="目前密碼" type="password" /></v-col>
								<v-col cols="12" md="6"><v-text-field label="新密碼" type="password" /></v-col>
								<v-col cols="12"><v-text-field label="確認新密碼" type="password" /></v-col>
								<v-col cols="12"><v-btn color="primary">更新密碼</v-btn></v-col>
							</v-row>
						</v-tabs-window-item>

						<v-tabs-window-item value="notifications">
							<v-list density="comfortable">
								<v-list-item v-for="n in notifications" :key="n.key">
									<v-list-item-title>{{ n.title }}</v-list-item-title>
									<v-list-item-subtitle>{{ n.desc }}</v-list-item-subtitle>
									<template #append>
										<v-switch color="primary" hide-details model-value />
									</template>
								</v-list-item>
							</v-list>
						</v-tabs-window-item>
					</v-tabs-window>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { ConfucianPageHeader, ConfucianBambooDivider } from "@confucian-ui/vuetify";

	const tab = ref("account");

	const notifications = [
		{ key: "order", title: "新訂單通知", desc: "有新訂單時即時通知我" },
		{ key: "weekly", title: "每週摘要", desc: "每週一早上寄送上週摘要" },
		{ key: "mention", title: "被提及時", desc: "在評論或留言中被提及時通知" },
	];
</script>
