<template>
	<v-btn
		variant="text"
		icon
		:aria-label="ariaLabel"
		@click="toggle"
	>
		<v-icon :icon="currentIcon" />
		<v-tooltip activator="parent" location="bottom">
			{{ tooltipText }}
		</v-tooltip>
	</v-btn>
</template>

<script setup lang="ts">
	import { computed } from "vue";

	import { useConfucianTheme } from "../../composables/useConfucianTheme";

	const { mode, toggle } = useConfucianTheme();

	// 以字串傳給 v-icon，走 adapter 解析才能套 duotone 預設
	const currentIcon = computed(() => mode.value === "light" ? "ph-sun" : "ph-moon");

	const tooltipText = computed(() =>
		mode.value === "light" ? "淺色模式（點擊切換至深色）" : "深色模式（點擊切換至淺色）"
	);

	const ariaLabel = computed(() => `切換主題，當前：${tooltipText.value}`);
</script>
