<template>
	<v-btn
		variant="text"
		:icon="count === undefined"
		:prepend-icon="count !== undefined ? 'ph-heart' : undefined"
		:size="count !== undefined ? 'small' : undefined"
		:class="{ 'like-btn': true, 'like-btn--liked': liked }"
		:style="{ '--like-color': `var(--v-theme-${color})` }"
		@click="liked = !liked"
	>
		<v-icon v-if="count === undefined" icon="ph-heart" />
		<template v-else>{{ displayCount }}</template>
	</v-btn>
</template>

<script setup lang="ts">
	import { computed, ref } from "vue";

	interface Props {
		/** 顯示計數時傳入初始值；不傳則為純 icon 按鈕 */
		count?: number;
		/** 喜歡時的強調色，對應 Vuetify theme 色名（如 "primary"、"error"） */
		color?: string;
	}
	const props = withDefaults(defineProps<Props>(), {
		color: "primary",
	});

	const liked = ref(false);
	const displayCount = computed(() =>
		props.count === undefined ? "" : props.count + (liked.value ? 1 : 0)
	);
</script>

<style scoped>
	/* 按下喜歡時，僅把 duotone 次要層（原本低飽和背景）填上指定色，
	 * 主層保持黑色輪廓。透過 attribute 選擇器鎖定 path[opacity="0.2"]、
	 * 提高 opacity 並覆寫 fill 成強調色的半透明版。
	 * --like-color 由 style binding 餵進，預設為 primary */
	.like-btn--liked :deep(.v-icon path[opacity="0.2"]) {
		opacity: 1;
		fill: rgba(var(--like-color), 0.7);
	}
</style>
