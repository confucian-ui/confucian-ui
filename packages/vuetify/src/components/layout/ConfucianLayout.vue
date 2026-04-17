<template>
	<v-app class="confucian-app">
		<ConfucianSidebar
			v-model="drawerOpen"
			:items="menu"
			:collapsed="sidebarCollapsed"
			:width="sidebarWidth"
			:rail-width="sidebarRailWidth"
			:title="title"
			:logo-src="logoSrc"
			:logo-size="logoSize"
			:brand-to="brandTo"
		>
			<template v-if="$slots.sidebarFooter" #footer>
				<slot name="sidebarFooter" />
			</template>
		</ConfucianSidebar>

		<ConfucianAppBar
			:height="appbarHeight"
			@toggle-sidebar="handleToggleSidebar"
		>
			<template #prepend>
				<slot name="appbarPrepend" />
			</template>

			<slot name="appbar" />

			<template v-if="$slots.appbarAppend" #append>
				<slot name="appbarAppend" />
			</template>
		</ConfucianAppBar>

		<v-main class="confucian-main" :class="{ 'confucian-main--with-back-to-top': showBackToTop }">
			<v-container :fluid="fluid" class="confucian-main__container">
				<slot />
			</v-container>
			<!-- 非 sticky：footer 渲染於 v-main 內，寬度自動扣除 sidebar、隨內容捲動 -->
			<ConfucianFooter v-if="showFooter && !stickyFooter" :app="false">
				<slot name="footer" />
				<template v-if="$slots.footerLinks" #links>
					<slot name="footerLinks" />
				</template>
			</ConfucianFooter>
		</v-main>

		<!-- Sticky：footer 放 v-app 下，透過 v-layout 機制常駐底部 -->
		<ConfucianFooter v-if="showFooter && stickyFooter" :app="true">
			<slot name="footer" />
			<template v-if="$slots.footerLinks" #links>
				<slot name="footerLinks" />
			</template>
		</ConfucianFooter>

		<!-- 回到頂部浮動按鈕 -->
		<ConfucianBackToTop v-if="showBackToTop" />
	</v-app>
</template>

<script setup lang="ts">
	import { ref } from "vue";

	import ConfucianSidebar from "./ConfucianSidebar.vue";
	import ConfucianAppBar from "./ConfucianAppBar.vue";
	import ConfucianFooter from "../common/ConfucianFooter.vue";
	import ConfucianBackToTop from "../common/ConfucianBackToTop.vue";
	import { useSidebarState } from "../../composables/useSidebarState";
	import { useBreakpointLayout } from "../../composables/useBreakpointLayout";

	import type { RouteLocationRaw } from "vue-router";
	import type { MenuEntry } from "../../types/menu";

	interface Props {
		menu: MenuEntry[];
		title?: string;
		// 自家 logo 圖片 URL（消費端通常以 import 取得路徑後傳入）
		logoSrc?: string;
		// logo 顯示尺寸（px）
		logoSize?: number;
		// 若提供，sidebar brand 區變成 RouterLink，點擊導到此路由
		brandTo?: RouteLocationRaw;
		sidebarWidth?: number;
		sidebarRailWidth?: number;
		appbarHeight?: number;
		fluid?: boolean;
		showFooter?: boolean;
		// true 時 footer 常駐於頁面底部（v-layout app 模式）；
		// 預設 false，footer 會隨主內容一起捲動
		stickyFooter?: boolean;
		// 是否顯示「回到頂部」浮動按鈕（捲過 50vh 時浮現），預設 true
		showBackToTop?: boolean;
	}

	withDefaults(defineProps<Props>(), {
		title: "Confucian",
		logoSrc: undefined,
		logoSize: 32,
		sidebarWidth: 260,
		sidebarRailWidth: 64,
		appbarHeight: 56,
		fluid: true,
		showFooter: true,
		stickyFooter: false,
		showBackToTop: true,
	});

	const { collapsed: sidebarCollapsed, toggle: toggleCollapsed } = useSidebarState();
	const { isDesktop } = useBreakpointLayout();
	// 桌機預設開、行動裝置預設關（避免一進站就遮住內容）
	const drawerOpen = ref(isDesktop.value);

	const handleToggleSidebar = () => {
		if(isDesktop.value) {
			// 桌機：切換 rail 折疊
			toggleCollapsed();
		} else {
			// 行動：切換 drawer 顯示
			drawerOpen.value = !drawerOpen.value;
		}
	};
</script>

<style scoped>
	/* v-main 本身就是 flex column，container 撐滿剩餘高度， */
	/* footer 才會永遠貼在底部（即使頁面內容很短） */
	.confucian-main {
		display: flex;
		flex-direction: column;
	}

	.confucian-main__container {
		flex: 1 1 auto;
		padding-block: 20px;
	}

	/* 啟用回到頂部按鈕時，內容右下留空間避免浮動按鈕遮住頁面角落元件 */
	.confucian-main--with-back-to-top .confucian-main__container {
		padding-block-end: 80px;
	}
</style>
