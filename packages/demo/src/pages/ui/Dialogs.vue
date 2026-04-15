<template>
	<div>
		<ConfucianPageHeader title="對話框" subtitle="v-dialog 與相關訊息元件" />

		<v-row>
			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">基本對話框</h3>
					<p class="text-body-medium text-medium-emphasis mb-4">
						最簡單的模態框：點擊按鈕後開啟，外部區域可關閉。
					</p>
					<v-btn color="primary" @click="basicOpen = true">開啟對話框</v-btn>

					<v-dialog v-model="basicOpen" max-width="420">
						<v-card class="pa-5">
							<h3 class="text-title-large confucian-heading mb-2">提示</h3>
							<p class="text-body-medium">此為基本對話框，適合展示簡短訊息。</p>
							<div class="d-flex justify-end mt-4">
								<v-btn variant="text" @click="basicOpen = false">關閉</v-btn>
							</div>
						</v-card>
					</v-dialog>
				</v-card>
			</v-col>

			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">確認對話框</h3>
					<p class="text-body-medium text-medium-emphasis mb-4">
						常見用於重要操作前的雙重確認。
					</p>
					<v-btn color="error" @click="confirmOpen = true">刪除帳號</v-btn>

					<v-dialog v-model="confirmOpen" max-width="440" persistent>
						<v-card class="pa-5">
							<h3 class="text-title-large confucian-heading mb-2">確定要刪除？</h3>
							<p class="text-body-medium">
								此操作無法還原。將永久刪除你的帳號與相關資料。
							</p>
							<ConfucianBambooDivider />
							<div class="d-flex justify-end ga-2">
								<v-btn variant="text" @click="confirmOpen = false">取消</v-btn>
								<v-btn color="error" variant="flat" @click="onConfirmDelete">確認刪除</v-btn>
							</div>
						</v-card>
					</v-dialog>
				</v-card>
			</v-col>

			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">表單對話框</h3>
					<p class="text-body-medium text-medium-emphasis mb-4">
						在對話框中嵌入表單，適合快速新增或編輯。
					</p>
					<v-btn color="primary" variant="tonal" @click="formOpen = true">新增使用者</v-btn>

					<v-dialog v-model="formOpen" max-width="480">
						<v-card class="pa-5">
							<h3 class="text-title-large confucian-heading mb-4">新增使用者</h3>
							<v-text-field v-model="form.name" label="姓名" />
							<v-text-field v-model="form.email" label="電子郵件" type="email" />
							<v-select
								v-model="form.role"
								:items="['管理員', '編輯', '檢視']"
								label="角色"
							/>
							<div class="d-flex justify-end ga-2 mt-2">
								<v-btn variant="text" @click="formOpen = false">取消</v-btn>
								<v-btn color="primary" variant="flat" @click="onFormSubmit">儲存</v-btn>
							</div>
						</v-card>
					</v-dialog>
				</v-card>
			</v-col>

			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">全螢幕對話框</h3>
					<p class="text-body-medium text-medium-emphasis mb-4">
						適合需要大量輸入或顯示內容的情境。
					</p>
					<v-btn color="accent" @click="fullOpen = true">開啟全螢幕</v-btn>

					<v-dialog v-model="fullOpen" fullscreen transition="dialog-bottom-transition">
						<v-card>
							<v-toolbar color="primary">
								<v-btn icon @click="fullOpen = false">
									<v-icon icon="$close" />
								</v-btn>
								<v-toolbar-title>全螢幕視窗</v-toolbar-title>
							</v-toolbar>
							<v-card-text class="pa-6">
								<h2 class="text-headline-small confucian-heading mb-4">詳細編輯</h2>
								<p class="text-body-large mb-4">
									全螢幕對話框適合編輯器、圖像檢視等需要充裕空間的操作。
								</p>
								<v-textarea label="內容" rows="12" />
							</v-card-text>
						</v-card>
					</v-dialog>
				</v-card>
			</v-col>

			<v-col cols="12">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">Snackbar 通知</h3>
					<p class="text-body-medium text-medium-emphasis mb-4">
						非阻塞式的訊息提示，常用於操作完成後的回饋。
					</p>
					<div class="d-flex flex-wrap ga-2">
						<v-btn color="success" @click="showSnack('success', '操作成功')">成功</v-btn>
						<v-btn color="warning" @click="showSnack('warning', '請留意此操作')">警告</v-btn>
						<v-btn color="error" @click="showSnack('error', '發生錯誤')">錯誤</v-btn>
						<v-btn color="info" @click="showSnack('info', '資訊更新')">資訊</v-btn>
					</div>

					<v-snackbar v-model="snack.show" :color="snack.color" location="bottom right" timeout="3000">
						{{ snack.text }}
						<template #actions>
							<v-btn variant="text" @click="snack.show = false">關閉</v-btn>
						</template>
					</v-snackbar>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { ConfucianPageHeader, ConfucianBambooDivider } from "@confucian-ui/vuetify";

	const basicOpen = ref(false);
	const confirmOpen = ref(false);
	const formOpen = ref(false);
	const fullOpen = ref(false);

	const form = ref({ name: "", email: "", role: null as string | null });

	const snack = ref({ show: false, color: "success", text: "" });
	const showSnack = (color: string, text: string) => {
		snack.value = { show: true, color, text };
	};

	const onConfirmDelete = () => {
		confirmOpen.value = false;
		showSnack("success", "已刪除");
	};

	const onFormSubmit = () => {
		formOpen.value = false;
		showSnack("success", `已新增 ${form.value.name || "使用者"}`);
		form.value = { name: "", email: "", role: null };
	};
</script>
