import { inject, ref, watch } from "vue";

import { CONFUCIAN_RUNTIME_KEY } from "../createConfucian";

// 側欄展開/折疊狀態管理
// 在桌面解析度下使用「rail」折疊到 icon-only；行動解析度由 v-navigation-drawer 的 temporary 行為處理
export function useSidebarState(initial: boolean = false) {
	const runtime = inject(CONFUCIAN_RUNTIME_KEY, null);
	const storageKey = runtime?.options.sidebarStorageKey ?? "confucian-sidebar-collapsed";

	const stored = ((): boolean | null => {
		if(typeof window === "undefined") return null;
		const v = window.localStorage.getItem(storageKey);
		if(v === "true") return true;
		if(v === "false") return false;
		return null;
	})();

	const collapsed = ref<boolean>(stored ?? initial);

	watch(collapsed, v => {
		if(typeof window !== "undefined") {
			window.localStorage.setItem(storageKey, String(v));
		}
	});

	const toggle = () => {
		collapsed.value = !collapsed.value;
	};

	const expand = () => {
		collapsed.value = false;
	};

	const collapse = () => {
		collapsed.value = true;
	};

	return {
		collapsed,
		toggle,
		expand,
		collapse,
	};
}
