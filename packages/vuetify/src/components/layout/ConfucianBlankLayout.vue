<template>
	<v-app>
		<v-main class="confucian-blank-layout" :style="{ '--confucian-blank-bg': `url(${bgUrl})` }">
			<slot />
		</v-main>
	</v-app>
</template>

<script setup lang="ts">
	// 空白佈局：沒有 sidebar 與 appbar，以竹葉背景圖鋪底
	// 適合登入、註冊、忘記密碼、錯誤頁等
	// 圖樣透過 mask-image 呈現，實際顏色由下方 background-color 控制，
	// 使同一張 SVG 能在 light / dark 模式下套不同色
	import bgUrl from "../../assets/bg.svg";
</script>

<style scoped>
	.confucian-blank-layout {
		position: relative;
		min-height: 100vh;
		overflow: hidden;
	}

	.confucian-blank-layout::before {
		content: "";
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 0;
		/* light 模式：赭石褐竹葉 */
		background-color: rgba(107, 83, 68, 0.22);
		mask-image: var(--confucian-blank-bg);
		mask-repeat: repeat-x;
		mask-size: auto 100vh;
		mask-position: center;
		-webkit-mask-image: var(--confucian-blank-bg);
		-webkit-mask-repeat: repeat-x;
		-webkit-mask-size: auto 100vh;
		-webkit-mask-position: center;
	}

	:deep(.v-theme--confucianDark) .confucian-blank-layout::before {
		/* dark 模式：淺米色竹葉 */
		background-color: rgba(232, 223, 211, 0.22);
	}

	.confucian-blank-layout :deep(> *) {
		position: relative;
		z-index: 1;
	}
</style>
