<template>
	<header class="confucian-page-header">
		<div>
			<h1 class="confucian-page-header__title">{{ title }}</h1>
			<p v-if="subtitle" class="confucian-page-header__subtitle">{{ subtitle }}</p>
		</div>
		<div v-if="$slots.actions" class="confucian-page-header__actions">
			<slot name="actions" />
		</div>
	</header>
</template>

<script setup lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
	}

	defineProps<Props>();
</script>
