import { computed } from "vue";
import { useDisplay } from "vuetify";

import type { ComputedRef } from "vue";

interface BreakpointLayoutResult {
	isCompact: ComputedRef<boolean>;
	isDesktop: ComputedRef<boolean>;
}

// Layout 層級的響應式 helper
// isCompact：小螢幕（< md），側欄應該走 temporary overlay
// isDesktop：md 以上，側欄走 permanent + rail
export function useBreakpointLayout(): BreakpointLayoutResult {
	const display = useDisplay();

	const isCompact = computed(() => display.smAndDown.value);
	const isDesktop = computed(() => display.mdAndUp.value);

	return {
		isCompact,
		isDesktop,
	};
}
