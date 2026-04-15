<template>
	<div>
		<ConfucianPageHeader title="警示" subtitle="v-alert 的多種變體與 snackbar 範例" />

		<v-card class="pa-6">
			<h3 class="text-title-large mb-4">Tonal 變體（預設）</h3>
			<v-alert class="mb-3" type="success" title="操作已完成">
				儒者重信，事成則告。
			</v-alert>
			<v-alert class="mb-3" type="info" title="資訊提示">
				敏而好學，不恥下問。
			</v-alert>
			<v-alert class="mb-3" type="warning" title="請注意">
				過猶不及，請審慎評估。
			</v-alert>
			<v-alert class="mb-3" type="error" title="發生錯誤">
				過則勿憚改，請稍後重試。
			</v-alert>

			<ConfucianBambooDivider />

			<h3 class="text-title-large mb-4">其它變體</h3>
			<v-alert variant="outlined" type="success" class="mb-3">Outlined 變體</v-alert>
			<v-alert variant="flat" type="info" class="mb-3">Flat 變體</v-alert>
			<v-alert variant="elevated" type="warning" class="mb-3">Elevated 變體</v-alert>
			<v-alert closable type="success" class="mb-3">可關閉的提示</v-alert>

			<ConfucianBambooDivider />

			<h3 class="text-title-large mb-4">Snackbar</h3>
			<v-btn color="success" @click="openSnackbar('success', '儲存成功')">成功</v-btn>
			<v-btn color="warning" class="ml-2" @click="openSnackbar('warning', '此操作不可還原')">警告</v-btn>
			<v-btn color="error" class="ml-2" @click="openSnackbar('error', '儲存失敗，請重試')">錯誤</v-btn>
		</v-card>

		<v-snackbar v-model="snack.show" :color="snack.color" location="top right" timeout="2500">
			{{ snack.text }}
		</v-snackbar>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { ConfucianPageHeader, ConfucianBambooDivider } from "@confucian-ui/vuetify";

	const snack = ref({ show: false, color: "success", text: "" });

	const openSnackbar = (color: string, text: string) => {
		snack.value = { show: true, color, text };
	};
</script>
