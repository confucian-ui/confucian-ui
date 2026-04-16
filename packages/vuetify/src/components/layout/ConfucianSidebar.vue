<template>
	<v-navigation-drawer
		v-model="drawerOpen"
		:rail="isDesktop && collapsed"
		:permanent="isDesktop"
		:temporary="!isDesktop"
		:width="width"
		:rail-width="railWidth"
		class="confucian-sidebar"
		color="sidebar-bg"
	>
		<!-- #prepend 讓 brand 區固定在 drawer 頂部，不隨 v-list 捲動
		     若傳入 brandTo，則 brand 會變成可點的 RouterLink（導回首頁之類） -->
		<template #prepend>
			<component
				:is="brandTo ? 'router-link' : 'div'"
				:to="brandTo"
				class="confucian-sidebar__brand"
				:class="{ 'confucian-sidebar__brand--clickable': !!brandTo }"
			>
				<ConfucianLogo
					:compact="isDesktop && collapsed"
					:title="title"
					:src="logoSrc"
					:size="logoSize"
				/>
			</component>
		</template>

		<v-list nav density="comfortable" class="confucian-sidebar__list">
			<template v-for="(entry, index) in items" :key="index">
				<!-- 分隔線 -->
				<ConfucianBambooDivider
					v-if="isMenuDivider(entry)"
					class="confucian-sidebar__divider"
				/>

				<!-- 群組標題（Vuetify subheader） -->
				<v-list-subheader v-else-if="isMenuHeading(entry)">
					{{ entry.heading }}
				</v-list-subheader>

				<!-- 巢狀群組：展開模式下用 v-list-group、rail 模式用 v-menu popup -->
				<template v-else-if="isMenuGroup(entry)">
					<!-- 展開模式：正常的可折疊群組 -->
					<v-list-group
						v-if="!isRail"
						:value="entry.title"
					>
						<template #activator="{ props: activatorProps }">
							<v-list-item
								v-bind="activatorProps"
								:prepend-icon="entry.icon"
								:title="entry.title"
							/>
						</template>
						<template v-for="(child, cIndex) in entry.children" :key="cIndex">
							<v-list-item
								v-if="isMenuLink(child)"
								:to="child.to"
								:href="child.href"
								:target="child.target"
								:prepend-icon="child.icon"
								:title="child.title"
							>
								<template v-if="child.badge" #append>
									<v-chip
										size="x-small"
										:color="child.badge.color ?? 'primary'"
										variant="tonal"
									>
										{{ child.badge.text }}
									</v-chip>
								</template>
							</v-list-item>
						</template>
					</v-list-group>

					<!-- rail 模式：以 popup menu 呈現子項 -->
					<v-menu
						v-else
						open-on-hover
						location="end"
						offset="4"
						open-delay="80"
						close-delay="120"
					>
						<template #activator="{ props: activatorProps }">
							<v-list-item
								v-bind="activatorProps"
								:prepend-icon="entry.icon"
								:title="entry.title"
							/>
						</template>
						<v-list density="comfortable" min-width="200" class="confucian-sidebar__popup">
							<v-list-subheader>{{ entry.title }}</v-list-subheader>
							<template v-for="(child, cIndex) in entry.children" :key="cIndex">
								<v-list-item
									v-if="isMenuLink(child)"
									:to="child.to"
									:href="child.href"
									:prepend-icon="child.icon"
									:title="child.title"
								>
									<template v-if="child.badge" #append>
										<v-chip
											size="x-small"
											:color="child.badge.color ?? 'primary'"
											variant="tonal"
										>
											{{ child.badge.text }}
										</v-chip>
									</template>
								</v-list-item>
							</template>
						</v-list>
					</v-menu>
				</template>

				<!-- 一般葉節點連結 -->
				<v-list-item
					v-else-if="isMenuLink(entry)"
					:to="entry.to"
					:href="entry.href"
					:target="entry.target"
					:prepend-icon="entry.icon"
					:title="entry.title"
				>
					<!-- rail 模式下文字隱藏，補上 tooltip 顯示完整名稱 -->
					<v-tooltip
						v-if="isRail"
						activator="parent"
						location="end"
						open-delay="200"
					>
						{{ entry.title }}
					</v-tooltip>
					<template v-if="entry.badge" #append>
						<v-chip
							size="x-small"
							:color="entry.badge.color ?? 'primary'"
							variant="tonal"
						>
							{{ entry.badge.text }}
						</v-chip>
					</template>
				</v-list-item>
			</template>
		</v-list>

		<template #append>
			<slot name="footer" />
		</template>
	</v-navigation-drawer>
</template>

<script setup lang="ts">
	import { computed, onMounted, onBeforeUnmount, ref } from "vue";

	import ConfucianLogo from "../common/ConfucianLogo.vue";
	import ConfucianBambooDivider from "../common/ConfucianBambooDivider.vue";
	import { useBreakpointLayout } from "../../composables/useBreakpointLayout";
	import {
		isMenuDivider,
		isMenuHeading,
		isMenuGroup,
		isMenuLink
	} from "../../types/menu";

	import type { RouteLocationRaw } from "vue-router";
	import type { MenuEntry } from "../../types/menu";

	interface Props {
		modelValue?: boolean;
		items: MenuEntry[];
		collapsed?: boolean;
		width?: number;
		railWidth?: number;
		title?: string;
		// 自家 logo 圖片 URL（通常由消費端 import 解析得到）
		logoSrc?: string;
		// logo 尺寸（px），同時作為 <img>/<svg> 的 width/height
		logoSize?: number;
		// 若提供，brand 區變成 RouterLink，點擊導到此路由（例如 "/" 首頁）
		brandTo?: RouteLocationRaw;
	}

	const props = withDefaults(defineProps<Props>(), {
		modelValue: true,
		collapsed: false,
		width: 260,
		railWidth: 64,
		title: "Confucian",
		logoSrc: undefined,
		logoSize: 32,
		brandTo: undefined,
	});

	const emit = defineEmits<{
		"update:modelValue": [value: boolean];
	}>();

	const { isDesktop } = useBreakpointLayout();

	const drawerOpen = computed({
		get: () => props.modelValue,
		set: v => emit("update:modelValue", v),
	});

	// 是否處於 rail（icon-only）狀態：僅在桌機 + 折疊時才成立
	// 行動裝置的 drawer 走 temporary overlay，不會 rail
	const isRail = computed(() => isDesktop.value && props.collapsed);

	// 自製 overlay 捲軸：
	// - 原生 scrollbar 已由 CSS 隱藏
	// - 在 drawer root（.confucian-sidebar）以 ::after 顯示自製 thumb
	// - 捲動時加 .is-scrolling 淡入，停止 700ms 後淡出
	// - thumb 的 height 與 top 透過 CSS 變數每次 scroll 計算後餵入
	const scrollEl = ref<HTMLElement | null>(null);
	const drawerRoot = ref<HTMLElement | null>(null);
	let hideTimer: ReturnType<typeof setTimeout> | null = null;

	const updateThumb = () => {
		const content = scrollEl.value;
		const root = drawerRoot.value;
		if(!content || !root) return;
		const { scrollTop, scrollHeight, clientHeight } = content;
		if(scrollHeight <= clientHeight) {
			// 無可捲動內容：隱藏 thumb
			root.style.setProperty("--confucian-thumb-height", "0px");
			return;
		}
		// 可捲區相對 drawer 的 top offset（brand 固定在頂，內容從 brand 下方開始）
		const scrollOffsetTop = content.getBoundingClientRect().top - root.getBoundingClientRect().top;
		// 軌道高度 = 可見高度 - 上下 padding（與 CSS 變數 --confucian-thumb-track-padding 對齊）
		const trackPadding = parseFloat(
			getComputedStyle(root).getPropertyValue("--confucian-thumb-track-padding")
		) || 0;
		const trackHeight = clientHeight - trackPadding * 2;
		// Thumb 高度 = 可見比例 × 軌道高度；最小 24px 避免太細
		const thumbHeight = Math.max(24, (clientHeight / scrollHeight) * trackHeight);
		const maxThumbTop = trackHeight - thumbHeight;
		const scrollRatio = scrollTop / (scrollHeight - clientHeight);
		const thumbTop = scrollRatio * maxThumbTop;
		root.style.setProperty("--confucian-thumb-height", thumbHeight + "px");
		root.style.setProperty("--confucian-thumb-top", thumbTop + "px");
		root.style.setProperty("--confucian-thumb-offset-top", scrollOffsetTop + "px");
	};

	const onScroll = () => {
		const root = drawerRoot.value;
		if(!root) return;
		updateThumb();
		root.classList.add("is-scrolling");
		if(hideTimer) clearTimeout(hideTimer);
		hideTimer = setTimeout(() => {
			root.classList.remove("is-scrolling");
		}, 700);
	};

	onMounted(() => {
		const root = document.querySelector(".confucian-sidebar");
		const content = root?.querySelector(".v-navigation-drawer__content");
		if(!(root instanceof HTMLElement) || !(content instanceof HTMLElement)) return;
		drawerRoot.value = root;
		scrollEl.value = content;
		content.addEventListener("scroll", onScroll, { passive: true });
		// 初始算一次 thumb 尺寸（雖然平時不顯示，但變數就緒，首次捲動不會跳動）
		updateThumb();
	});

	onBeforeUnmount(() => {
		const el = scrollEl.value;
		if(el) el.removeEventListener("scroll", onScroll);
		if(hideTimer) clearTimeout(hideTimer);
	});
</script>
