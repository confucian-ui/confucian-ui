<template>
	<div>
		<ConfucianPageHeader title="基本表單" subtitle="常見的聯絡表單範例" />

		<v-row>
			<v-col cols="12" md="8" offset-md="2">
				<v-card class="pa-6">
					<v-form ref="formRef" @submit.prevent="submit">
						<v-row>
							<v-col cols="12" md="6">
								<v-text-field v-model="form.firstName" label="名字" :rules="[req]" />
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field v-model="form.lastName" label="姓氏" :rules="[req]" />
							</v-col>
							<v-col cols="12">
								<v-text-field v-model="form.email" label="電子郵件" type="email" :rules="[req, emailRule]" />
							</v-col>
							<v-col cols="12" md="6">
								<v-select v-model="form.topic" :items="topics" label="主題" :rules="[req]" />
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field v-model="form.phone" label="聯絡電話" />
							</v-col>
							<v-col cols="12">
								<v-textarea v-model="form.message" label="留言" rows="4" :rules="[req]" />
							</v-col>
							<v-col cols="12">
								<v-checkbox v-model="form.agree" label="我同意隱私政策" :rules="[agreeRule]" />
							</v-col>
							<v-col cols="12">
								<v-btn type="submit" color="primary" size="large">送出</v-btn>
								<v-btn class="ml-2" variant="outlined" size="large" @click="reset">重設</v-btn>
							</v-col>
						</v-row>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts">
	import { ref, useTemplateRef } from "vue";
	import { ConfucianPageHeader } from "@confucian-ui/vuetify";

	const topics = ["合作洽詢", "技術支援", "客訴反映", "其它"];

	const form = ref({
		firstName: "",
		lastName: "",
		email: "",
		topic: null as string | null,
		phone: "",
		message: "",
		agree: false,
	});

	const formRef = useTemplateRef<HTMLFormElement>("formRef");

	const req = (v: unknown) => Boolean(v) || "此欄位為必填";
	const emailRule = (v: string) => /.+@.+\..+/.test(v) || "請輸入有效的電子郵件";
	const agreeRule = (v: boolean) => v || "須同意政策方可送出";

	const submit = () => {
		// 展示用：僅 console log
		console.log("form submitted", form.value);
	};

	const reset = () => {
		form.value = {
			firstName: "",
			lastName: "",
			email: "",
			topic: null,
			phone: "",
			message: "",
			agree: false,
		};
		(formRef.value as unknown as { resetValidation?: () => void })?.resetValidation?.();
	};
</script>
