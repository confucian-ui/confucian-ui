<template>
	<v-container class="fill-height" fluid>
		<v-row align="center" justify="center">
			<v-col cols="12" sm="8" md="5" lg="4" xl="3">
				<v-card class="pa-6 pa-sm-8" rounded="sm">
					<div class="text-center mb-6">
						<ConfucianLogo :size="44" :src="logoUrl" />
						<p class="text-medium-emphasis mt-3 text-body-medium">
							輸入電子郵件以重設密碼
						</p>
					</div>

					<v-form @submit.prevent="onSubmit">
						<v-text-field v-model="email" label="電子郵件" type="email" prepend-inner-icon="ph-envelope" />
						<v-btn type="submit" block color="primary" size="large" :loading="loading">發送重設連結</v-btn>
					</v-form>

					<ConfucianBambooDivider />

					<div class="text-center text-body-medium">
						想起密碼了？
						<router-link to="/auth/login" class="text-primary text-decoration-none">返回登入</router-link>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { ConfucianLogo, ConfucianBambooDivider } from "@confucian-ui/vuetify";

	import logoUrl from "../../assets/logo.svg";

	const email = ref("");
	const loading = ref(false);

	const onSubmit = async () => {
		loading.value = true;
		await new Promise(r => setTimeout(r, 600));
		loading.value = false;
	};
</script>
