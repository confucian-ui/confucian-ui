<template>
	<ConfucianLayout :menu="menu" title="Confucian" :logo-src="logoUrl" :logo-size="48" brand-to="/">
		<template #appbar>
			<ConfucianBreadcrumb :items="breadcrumbs" />
		</template>
		<router-view />
	</ConfucianLayout>
</template>

<script setup lang="ts">
	import { computed } from "vue";
	import { useRoute } from "vue-router";
	import { ConfucianLayout, ConfucianBreadcrumb } from "@confucian-ui/vuetify";

	import { menu } from "../router/menu";
	import logoUrl from "../assets/logo.svg";

	import type { BreadcrumbItem } from "@confucian-ui/vuetify";

	const route = useRoute();

	const breadcrumbs = computed<BreadcrumbItem[]>(() => {
		const title = typeof route.meta.title === "string" ? route.meta.title : "";
		if(!title || route.path === "/") return [];
		return [
			{ title: "首頁", to: "/" },
			{ title },
		];
	});
</script>
