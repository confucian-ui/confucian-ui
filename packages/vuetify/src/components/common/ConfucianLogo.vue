<template>
	<div class="confucian-logo" :class="{ 'confucian-logo--compact': compact }">
		<!-- 消費端提供自家 logo 圖片 -->
		<img
			v-if="src"
			class="confucian-logo__mark confucian-logo__mark--img"
			:src="src"
			:width="size"
			:height="size"
			:alt="title"
		>
		<!-- 未提供時使用預設 SVG（簡化的竹簡 C 字） -->
		<svg
			v-else
			class="confucian-logo__mark"
			:width="size"
			:height="size"
			viewBox="0 0 64 64"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<defs>
				<linearGradient id="confucianBambooGrad" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stop-color="#D9A877" />
					<stop offset="100%" stop-color="#B06F2C" />
				</linearGradient>
			</defs>
			<g fill="url(#confucianBambooGrad)" stroke="#6B4520" stroke-width="0.6">
				<rect x="18" y="8" width="4" height="20" rx="1" />
				<rect x="24" y="6" width="4" height="22" rx="1" />
				<rect x="30" y="6" width="4" height="22" rx="1" />
				<rect x="36" y="8" width="4" height="20" rx="1" />
				<rect x="10" y="20" width="4" height="24" rx="1" />
				<rect x="10" y="36" width="4" height="22" rx="1" transform="rotate(-2 12 47)" />
				<rect x="18" y="38" width="4" height="20" rx="1" />
				<rect x="24" y="38" width="4" height="22" rx="1" />
				<rect x="30" y="38" width="4" height="22" rx="1" />
				<rect x="36" y="38" width="4" height="20" rx="1" />
			</g>
			<path d="M 12 22 Q 30 18 44 16" fill="none" stroke="#4A2E14" stroke-width="1.2" opacity="0.7" />
			<path d="M 12 44 Q 30 48 44 50" fill="none" stroke="#4A2E14" stroke-width="1.2" opacity="0.7" />
		</svg>
		<span class="confucian-logo__text">{{ title }}</span>
	</div>
</template>

<script setup lang="ts">
	// Confucian Logo：可由消費者傳入 src 顯示自家品牌圖示，未提供時 fallback 到內建竹簡 SVG
	interface Props {
		title?: string;
		size?: number;
		compact?: boolean;
		// 自家 logo 的 image URL（消費端透過 import 解析過的路徑，或公開 URL）
		src?: string;
	}

	withDefaults(defineProps<Props>(), {
		title: "Confucian",
		size: 32,
		compact: false,
		src: undefined,
	});
</script>

<style scoped>
	.confucian-logo {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-family: var(--v-font-heading);
		font-weight: 600;
		letter-spacing: 0.05em;
	}

	.confucian-logo__text {
		font-size: 2rem;
		color: inherit;
		white-space: nowrap;
		overflow: hidden;
		/* 展開時允許自然寬度；折疊時 max-width 收到 0，搭配 opacity 淡出 */
		max-width: 240px;
		opacity: 1;
		transition: max-width 0.5s ease, opacity 0.3s ease;
	}

	.confucian-logo--compact .confucian-logo__text {
		max-width: 0;
		opacity: 0;
	}

	.confucian-logo__mark {
		flex-shrink: 0;
	}

	.confucian-logo__mark--img {
		object-fit: contain;
	}
</style>
