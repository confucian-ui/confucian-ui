<template>
	<ConfucianLayout :menu="menu" title="Confucian" :logo-src="logoUrl" :logo-size="48" brand-to="/">
		<template #appbar>
			<v-breadcrumbs
				v-if="breadcrumbs.length"
				:items="breadcrumbs"
				divider="·"
				density="compact"
				class="pa-0 d-none d-sm-flex"
			/>
		</template>
		<router-view />
	</ConfucianLayout>
</template>

<script setup lang="ts">
	import { computed } from "vue";
	import { useRoute } from "vue-router";
	import { ConfucianLayout } from "@confucian-ui/vuetify";

	import { menu } from "../router/menu";
	import logoUrl from "../assets/logo.svg";

	const route = useRoute();

	const breadcrumbs = computed(() => {
		const title = typeof route.meta.title === "string" ? route.meta.title : "";
		if(!title || route.path === "/") return [];
		return [
			{ title: "首頁", to: "/" },
			{ title, disabled: true },
		];
	});
</script>
