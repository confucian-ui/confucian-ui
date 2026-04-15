<template>
	<nav v-if="items.length > 0" class="confucian-breadcrumb" aria-label="breadcrumb">
		<ol class="confucian-breadcrumb__list">
			<li
				v-for="(item, index) in items"
				:key="index"
				class="confucian-breadcrumb__item"
				:class="{ 'confucian-breadcrumb__item--current': index === items.length - 1 }"
			>
				<router-link
					v-if="item.to && index < items.length - 1"
					:to="item.to"
					class="confucian-breadcrumb__link"
				>
					{{ item.title }}
				</router-link>
				<span v-else class="confucian-breadcrumb__text">{{ item.title }}</span>

				<span
					v-if="index < items.length - 1"
					class="confucian-breadcrumb__separator"
					aria-hidden="true"
				>
					·
				</span>
			</li>
		</ol>
	</nav>
</template>

<script setup lang="ts">
	import type { RouteLocationRaw } from "vue-router";

	export interface BreadcrumbItem {
		title: string;
		to?: RouteLocationRaw;
	}

	interface Props {
		items: BreadcrumbItem[];
	}

	defineProps<Props>();
</script>

<style scoped>
	.confucian-breadcrumb {
		/* 在 appbar 與 main 區皆可使用，本身不留外邊距 */
		min-width: 0;
		display: flex;
		align-items: center;
	}

	/* 窄螢幕不顯示 breadcrumb，避免 appbar 擁擠 */
	@media (max-width: 767px) {
		.confucian-breadcrumb {
			display: none;
		}
	}

	.confucian-breadcrumb__list {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
		padding: 0;
		margin: 0;
		list-style: none;
		font-size: 0.82rem;
		color: rgba(var(--v-theme-on-surface), 0.65);
	}

	.confucian-breadcrumb__item {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		list-style: none;
	}

	.confucian-breadcrumb__link {
		color: inherit;
		text-decoration: none;
		transition: color 0.15s ease;
	}

	.confucian-breadcrumb__link:hover {
		color: rgb(var(--v-theme-primary));
	}

	.confucian-breadcrumb__item--current .confucian-breadcrumb__text {
		color: rgba(var(--v-theme-on-surface), 0.9);
		font-weight: 500;
	}

	.confucian-breadcrumb__separator {
		opacity: 0.4;
		font-weight: 600;
	}
</style>
