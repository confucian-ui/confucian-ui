// @confucian-ui/vuetify 公開 API
// 使用方式：
//   import { createConfucian, ConfucianLayout } from "@confucian-ui/vuetify";
//   import "@confucian-ui/vuetify/styles";

export { createConfucian, CONFUCIAN_RUNTIME_KEY } from "./createConfucian";
export type { CreateConfucianOptions, ConfucianRuntime } from "./createConfucian";

export { confucianBlueprint } from "./blueprint";

export { tokens, confucianLight, confucianDark } from "./theme/index";
export type { ConfucianTokens } from "./theme/index";

export { phosphorAliases, phosphorIconSet, registerPhosphorIcon } from "./icons/index";

export {
	useConfucianTheme,
	useSidebarState,
	useBreakpointLayout,
	useApexDefaults
} from "./composables/index";
export type { ApexDefaults } from "./composables/index";

export {
	ConfucianLayout,
	ConfucianBlankLayout,
	ConfucianSidebar,
	ConfucianAppBar,
	ConfucianFooter,
	ConfucianLogo,
	ConfucianThemeToggle,
	ConfucianUserMenu,
	ConfucianPageHeader,
	ConfucianBambooDivider,
	ConfucianBackToTop
} from "./components/index";
export type {
	MenuEntry,
	MenuItem,
	MenuHeading,
	MenuDivider,
	MenuLink,
	MenuGroup,
	MenuBadge,
	SidebarConfig,
	ThemeMode,
	ConfucianRuntimeOptions
} from "./types/index";

export {
	isMenuHeading,
	isMenuDivider,
	isMenuGroup,
	isMenuLink
} from "./types/index";
