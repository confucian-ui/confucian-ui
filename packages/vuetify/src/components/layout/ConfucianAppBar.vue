<template>
	<!-- Slots:
	     - prepend: 漢堡按鈕之後、主內容之前（breadcrumb 適合放這）
	     - default: 中間主內容區
	     - append:  右側區域；預設含 ThemeToggle + UserMenu，
	                覆寫後需自行放入想要的元件（見 starter 的 DefaultLayout 範例） -->
	<v-app-bar class="confucian-app-bar" :height="height" :density="density" flat>
		<v-btn variant="text" icon="$menu" :aria-label="sidebarToggleLabel" @click="emit('toggle-sidebar')" />

		<slot name="prepend" />

		<div class="confucian-app-bar__content">
			<slot />
		</div>

		<v-spacer />

		<slot name="append">
			<ConfucianThemeToggle />
			<ConfucianUserMenu />
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
