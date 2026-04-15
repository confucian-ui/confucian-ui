<template>
	<transition name="fade">
		<v-btn
			v-if="visible"
			class="confucian-back-to-top"
			color="secondary"
			icon="ph-arrow-line-up"
			:size="size"
			elevation="4"
			rounded="large"
			:aria-label="label"
			@click="scrollToTop"
		/>
	</transition>
</template>

<script setup lang="ts">
	// 回到頂部按鈕：在捲動超過 triggerVh（預設 50vh）後浮現，點擊平滑回到頂部
	import { onBeforeUnmount, onMounted, ref } from "vue";

	interface Props {
		// 觸發顯示的最小捲動距離（以 viewport 高度倍數；預設 0.5 代表 50vh）
		triggerVh?: number;
		size?: number | string;
		label?: string;
	}

	const props = withDefaults(defineProps<Props>(), {
		triggerVh: 0.5,
		size: 44,
		label: "回到頂部",
	});

	const visible = ref(false);

	const onScroll = () => {
		const threshold = window.innerHeight * props.triggerVh;
		// 支援 v-main 的捲動（v-layout 會讓 window 仍可捲動）
		const y = window.scrollY || document.documentElement.scrollTop;
		visible.value = y > threshold;
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	onMounted(() => {
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
	});

	onBeforeUnmount(() => {
		window.removeEventListener("scroll", onScroll);
	});
</script>

<style scoped>
	.confucian-back-to-top {
		position: fixed;
		right: 24px;
		bottom: 48px;
		z-index: 10;
		opacity: 1;
		transition: opacity 0.2s ease, transform 0.2s ease;
	}

	/* fade transition */
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s ease, transform 0.3s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
		transform: translateY(10px);
	}
</style>
