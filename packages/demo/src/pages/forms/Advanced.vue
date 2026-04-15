<template>
	<div>
		<ConfucianPageHeader title="進階表單" subtitle="步驟式 Stepper 表單" />

		<v-card class="pa-4">
			<v-stepper v-model="step" :items="['基本資訊', '帳號設定', '完成確認']">
				<template #[`item.1`]>
					<v-row>
						<v-col cols="12" md="6"><v-text-field v-model="form.name" label="姓名" /></v-col>
						<v-col cols="12" md="6"><v-text-field v-model="form.phone" label="電話" /></v-col>
						<v-col cols="12"><v-text-field v-model="form.address" label="地址" /></v-col>
					</v-row>
				</template>

				<template #[`item.2`]>
					<v-row>
						<v-col cols="12" md="6"><v-text-field v-model="form.email" label="電子郵件" type="email" /></v-col>
						<v-col cols="12" md="6"><v-text-field v-model="form.username" label="使用者名稱" /></v-col>
						<v-col cols="12" md="6"><v-text-field v-model="form.password" label="密碼" type="password" /></v-col>
						<v-col cols="12" md="6"><v-text-field v-model="form.confirmPassword" label="確認密碼" type="password" /></v-col>
					</v-row>
				</template>

				<template #[`item.3`]>
					<v-card variant="tonal" color="primary" class="pa-5">
						<h3 class="text-title-large mb-3">請確認以下資訊</h3>
						<v-list density="compact" lines="two" bg-color="transparent">
							<v-list-item v-for="(v, k) in displayValues" :key="k" :title="labels[k]" :subtitle="v || '（未填）'" />
						</v-list>
					</v-card>
				</template>
			</v-stepper>
		</v-card>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed } from "vue";
	import { ConfucianPageHeader } from "@confucian-ui/vuetify";

	const step = ref(1);

	const form = ref({
		name: "",
		phone: "",
		address: "",
		email: "",
		username: "",
		password: "",
		confirmPassword: "",
	});

	const labels: Record<string, string> = {
		name: "姓名",
		phone: "電話",
		address: "地址",
		email: "電子郵件",
		username: "使用者名稱",
	};

	const displayValues = computed(() => ({
		name: form.value.name,
		phone: form.value.phone,
		address: form.value.address,
		email: form.value.email,
		username: form.value.username,
	}));
</script>
