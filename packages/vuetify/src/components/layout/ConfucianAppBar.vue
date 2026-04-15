<template>
	<v-app-bar
		class="confucian-app-bar"
		:height="height"
		:density="density"
		flat
	>
		<v-btn
			variant="text"
			icon="$menu"
			:aria-label="sidebarToggleLabel"
			@click="emit('toggle-sidebar')"
		/>

		<slot name="prepend" />

		<div class="confucian-app-bar__content">
			<slot />
		</div>

		<v-spacer />

		<slot name="append">
			<ConfucianThemeToggle />
			<slot name="user">
				<ConfucianUserMenu />
			</slot>
		</slot>
	</v-app-bar>
</template>

<script setup lang="ts">
	import ConfucianThemeToggle from "../common/ConfucianThemeToggle.vue";
	import ConfucianUserMenu from "../common/ConfucianUserMenu.vue";

	interface Props {
		height?: number;
		density?: "default" | "comfortable" | "compact";
		sidebarToggleLabel?: string;
	}

	withDefaults(defineProps<Props>(), {
		height: 56,
		density: "comfortable",
		sidebarToggleLabel: "切換側欄",
	});

	const emit = defineEmits<{
		"toggle-sidebar": [];
	}>();
</script>

<style scoped>
	.confucian-app-bar__content {
		display: flex;
		align-items: center;
		flex: 1 1 auto;
		gap: 12px;
		padding-inline: 8px;
	}
</style>
