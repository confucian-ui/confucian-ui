<template>
	<v-container class="fill-height" fluid>
		<v-row align="center" justify="center">
			<v-col cols="12" sm="8" md="5" lg="4" xl="3">
				<v-card class="pa-6 pa-sm-8" elevation="2" rounded="sm">
					<div class="text-center mb-6">
						<ConfucianLogo :size="44" :src="logoUrl" />
						<p class="text-medium-emphasis mt-3 text-body-medium">
							登入以進入你的工作軒
						</p>
					</div>

					<v-form @submit.prevent="onSubmit">
						<v-text-field
							v-model="email"
							label="電子郵件"
							type="email"
							prepend-inner-icon="ph-envelope"
							:rules="[requireRule]"
							autocomplete="email"
						/>
						<v-text-field
							v-model="password"
							label="密碼"
							:type="showPwd ? 'text' : 'password'"
							prepend-inner-icon="ph-lock"
							:append-inner-icon="showPwd ? '$confucian-eye-off' : '$confucian-eye'"
							:rules="[requireRule]"
							autocomplete="current-password"
							@click:append-inner="showPwd = !showPwd"
						/>

						<div class="d-flex align-center justify-space-between mb-4">
							<v-checkbox v-model="remember" label="記住我" hide-details density="compact" />
							<router-link to="/auth/forgot" class="text-body-small text-decoration-none text-primary">
								忘記密碼？
							</router-link>
						</div>

						<v-btn
							type="submit"
							block
							color="primary"
							size="large"
							:loading="loading"
						>
							登入
						</v-btn>
					</v-form>

					<ConfucianBambooDivider />

					<div class="text-center text-body-medium">
						尚無帳號？
						<router-link to="/auth/register" class="text-primary text-decoration-none">
							立即註冊
						</router-link>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { useRouter } from "vue-router";
	import { ConfucianLogo, ConfucianBambooDivider } from "@confucian-ui/vuetify";

	import logoUrl from "../../assets/logo.svg";

	const router = useRouter();

	const email = ref("");
	const password = ref("");
	const remember = ref(true);
	const showPwd = ref(false);
	const loading = ref(false);

	const requireRule = (v: string) => Boolean(v) || "此欄位為必填";

	const onSubmit = async () => {
		loading.value = true;
		await new Promise(r => setTimeout(r, 800));
		loading.value = false;
		router.push("/");
	};
</script>
