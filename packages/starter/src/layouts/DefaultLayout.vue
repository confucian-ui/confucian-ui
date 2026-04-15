<template>
	<ConfucianLayout :menu="menu" title="Confucian" :logo-src="logoUrl">
		<router-view />
	</ConfucianLayout>
</template>

<script setup lang="ts">
	import { ConfucianLayout } from "@confucian-ui/vuetify";

	import { menu } from "../router/menu";
	import logoUrl from "../assets/logo.svg";
</script>
