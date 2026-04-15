<template>
	<v-container class="fill-height" fluid>
		<v-row align="center" justify="center">
			<v-col cols="12" sm="8" md="5" lg="4" xl="3">
				<v-card class="pa-6 pa-sm-8" rounded="sm">
					<div class="text-center mb-6">
						<ConfucianLogo :size="44" :src="logoUrl" />
						<p class="text-medium-emphasis mt-3 text-body-medium">請先登入以繼續</p>
					</div>

					<v-form @submit.prevent="onSubmit">
						<v-text-field v-model="email" label="電子郵件" type="email" prepend-inner-icon="ph-envelope" />
						<v-text-field v-model="password" label="密碼" type="password" prepend-inner-icon="ph-lock" />

						<v-btn type="submit" block color="primary" size="large" :loading="loading">
							登入
						</v-btn>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { useRouter } from "vue-router";
	import { ConfucianLogo } from "@confucian-ui/vuetify";

	import logoUrl from "../../assets/logo.svg";

	const router = useRouter();
	const email = ref("");
	const password = ref("");
	const loading = ref(false);

	const onSubmit = async () => {
		loading.value = true;
		await new Promise(r => setTimeout(r, 400));
		loading.value = false;
		router.push("/");
	};
</script>
