<template>
	<div
		class="confucian-bamboo-divider"
		:class="[`confucian-bamboo-divider--${variant}`, { 'confucian-bamboo-divider--labeled': !!label }]"
		role="separator"
	>
		<span v-if="variant !== 'start'" class="confucian-bamboo-divider__line"/>
		<span class="confucian-bamboo-divider__nodes" aria-hidden="true">
			<span
				v-for="n in nodeCount"
				:key="n"
				class="confucian-bamboo-divider__node"
			/>
		</span>
		<span v-if="label" class="confucian-bamboo-divider__label">{{ label }}</span>
		<span class="confucian-bamboo-divider__line"/>
	</div>
</template>

<script setup lang="ts">
	// 竹紋分隔線：以細線 + 等距竹節圓點呈現
	// variant="center"（預設）：兩側為線，中間三節
	// variant="start"：僅右側有線，左側為節點群（適合 sidebar group）
	// variant="labeled"：搭配 label 顯示群組標題
	import { computed } from "vue";

	interface Props {
		variant?: "center" | "start";
		label?: string;
		nodes?: number;
	}

	const props = withDefaults(defineProps<Props>(), {
		variant: "center",
		label: undefined,
		nodes: 3,
	});

	const nodeCount = computed(() => Math.max(1, props.nodes));
</script>
