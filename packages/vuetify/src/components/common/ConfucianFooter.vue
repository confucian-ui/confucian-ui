<template>
	<v-footer class="confucian-footer" :app="app">
		<div class="confucian-footer__content">
			<slot>
				<div class="confucian-footer__copy">
					© {{ year }} {{ brand }}. <span>{{ tagline }}</span>
				</div>
				<div v-if="$slots.links" class="confucian-footer__links">
					<slot name="links" />
				</div>
			</slot>
		</div>
	</v-footer>
</template>

<script setup lang="ts">
	import { computed } from "vue";

	interface Props {
		brand?: string;
		tagline?: string;
		// true 時使用 v-footer 的 app 模式（透過 v-layout 常駐於底部），
		// 預設為 false，footer 會隨主內容一起捲動
		app?: boolean;
	}

	withDefaults(defineProps<Props>(), {
		brand: "Confucian",
		tagline: "竹簡雅軒，行事中庸",
		app: false,
	});

	const year = computed(() => new Date().getFullYear());
</script>

<style scoped>
	.confucian-footer {
		background-color: transparent !important;
		border-top: 1px solid rgba(0, 0, 0, 0.08);
		flex-grow: 0;
	}

	:deep(.v-theme--confucianDark) .confucian-footer {
		border-top-color: rgba(255, 255, 255, 0.08);
	}

	.confucian-footer__content {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 100%;
		gap: 16px;
		flex-wrap: wrap;
		font-size: 0.82rem;
		opacity: 0.75;
		text-align: end;
	}

	.confucian-footer__links {
		display: flex;
		gap: 16px;
	}
</style>
