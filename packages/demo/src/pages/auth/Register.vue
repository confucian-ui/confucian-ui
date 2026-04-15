<template>
	<v-container class="fill-height" fluid>
		<v-row align="center" justify="center">
			<v-col cols="12" sm="8" md="5" lg="4" xl="3">
				<v-card class="pa-6 pa-sm-8" rounded="sm">
					<div class="text-center mb-6">
						<ConfucianLogo :size="44" :src="logoUrl" />
						<p class="text-medium-emphasis mt-3 text-body-medium">加入 Confucian</p>
					</div>

					<v-form v-model="valid" @submit.prevent="onSubmit">
						<v-text-field v-model="name" label="姓名" prepend-inner-icon="ph-user" :rules="nameRules" />
						<v-text-field v-model="email" label="電子郵件" type="email" prepend-inner-icon="ph-envelope" :rules="emailRules" />
						<v-text-field v-model="password" label="密碼" type="password" prepend-inner-icon="ph-lock" :rules="passwordRules" />
						<v-checkbox v-model="agree" label="同意服務條款與隱私政策" hide-details density="compact" class="mb-4" :rules="agreeRules" />
						<v-btn type="submit" block color="primary" size="large">建立帳號</v-btn>
					</v-form>

					<ConfucianBambooDivider />

					<div class="text-center text-body-medium">
						已經有帳號？
						<router-link to="/auth/login" class="text-primary text-decoration-none">直接登入</router-link>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { useRouter } from "vue-router";
	import isEmail from "validator/es/lib/isEmail";
	import { ConfucianLogo, ConfucianBambooDivider } from "@confucian-ui/vuetify";

	import logoUrl from "../../assets/logo.svg";

	const router = useRouter();
	const valid = ref(false);
	const name = ref("");
	const email = ref("");
	const password = ref("");
	const agree = ref(false);

	const nameRules = [
		(v: string) => Boolean(v) || "請輸入姓名",
	];
	const emailRules = [
		(v: string) => Boolean(v) || "請輸入電子郵件",
		(v: string) => isEmail(v) || "請輸入有效的電子郵件格式",
	];
	const passwordRules = [
		(v: string) => Boolean(v) || "請輸入密碼",
		(v: string) => v.length >= 8 || "密碼至少 8 個字元",
	];
	const agreeRules = [
		(v: boolean) => Boolean(v) || "必須同意條款才能註冊",
	];

	const onSubmit = () => {
		if(!valid.value) return;
		router.push("/auth/login");
	};
</script>
