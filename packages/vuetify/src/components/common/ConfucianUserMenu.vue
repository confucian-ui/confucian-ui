<template>
	<v-menu offset="8">
		<template #activator="{ props: activatorProps }">
			<v-btn variant="text" v-bind="activatorProps" class="confucian-user-menu__trigger" icon>
				<v-avatar
					:color="avatarColor"
					:size="36"
					:image="avatar"
					:style="avatarStyle"
				>
					<span v-if="!avatar" class="confucian-user-menu__initials">
						{{ initials }}
					</span>
				</v-avatar>
			</v-btn>
		</template>

		<!-- Slots:
		     - header: 選單頂部（使用者名片、帳號資訊等），有內容時自動加分隔線
		     - default: 選單項目列表；預設含「個人資料」+「登出」，
		               覆寫後完全自訂（見 starter 的 DefaultLayout 範例） -->
		<v-list min-width="220" density="comfortable">
			<v-list-item v-if="$slots.header" class="confucian-user-menu__header">
				<slot name="header" />
			</v-list-item>

			<v-divider v-if="$slots.header" />

			<slot>
				<v-list-item :to="profileTo" prepend-icon="$edit">
					<v-list-item-title>個人資料</v-list-item-title>
				</v-list-item>
				<v-list-item @click="emit('logout')" prepend-icon="ph-sign-out">
					<v-list-item-title>登出</v-list-item-title>
				</v-list-item>
			</slot>
		</v-list>
	</v-menu>
</template>

<script setup lang="ts">
	import { computed } from "vue";

	import type { RouteLocationRaw } from "vue-router";

	interface Props {
		displayName?: string;
		avatar?: string;
		avatarColor?: string;
		profileTo?: RouteLocationRaw;
	}

	const props = withDefaults(defineProps<Props>(), {
		displayName: "使用者",
		avatar: undefined,
		avatarColor: "primary",
		profileTo: "/profile",
	});

	const emit = defineEmits<{
		logout: [];
	}>();

	const initials = computed(() => {
		const n = props.displayName.trim();
		if(!n) return "U";
		// 中文取第一字；英文取首尾字
		if(/[\u4e00-\u9fa5]/.test(n)) return n[0];
		const parts = n.split(/\s+/);
		return (parts[0][0] + (parts[parts.length - 1][0] ?? "")).toUpperCase();
	});

	// 依 avatarColor 推算對應的前景色（Vuetify 會為每個主題色產出 --v-theme-on-<color>）
	const avatarStyle = computed(() => ({
		color: `rgb(var(--v-theme-on-${props.avatarColor}))`,
	}));
</script>

<style scoped>
	.confucian-user-menu__initials {
		font-size: 0.85rem;
		font-weight: 600;
	}
</style>
