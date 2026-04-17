<template>
	<!-- 加上 brand-to 可以指定按下品牌列時前往的頁面 -->
	<ConfucianLayout :menu="menu" title="Confucian" :logo-src="logoUrl">
		<template #appbarAppend>
			<ConfucianThemeToggle />
			<ConfucianUserMenu>
				<v-list-item @click="$router.push('/auth/login')" prepend-icon="ph-sign-out">
					<v-list-item-title>登出</v-list-item-title>
				</v-list-item>
			</ConfucianUserMenu>
		</template>
		<router-view />
	</ConfucianLayout>
</template>

<script setup lang="ts">
	import { ConfucianLayout, ConfucianThemeToggle, ConfucianUserMenu } from "@confucian-ui/vuetify";

	import { menu } from "../router/menu";
	import logoUrl from "../assets/logo.svg";
</script>
