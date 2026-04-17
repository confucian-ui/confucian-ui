// Library 自己的 Vue SFC 用到的 Vuetify 元件與指令的明確 import。
//
// 不用 `import * as VuetifyComponents from "vuetify/components"`——那會把所有 Vuetify
// 元件（含 VCalendar、VDataTable 等消費端才用的大型元件）拉進 library dist，
// 消費端無法 tree-shake。改為只 import library SFC 實際用到的元件。
//
// 消費端自己的 SFC 由 @confucian-ui/rsbuild-plugin（webpack-plugin-vuetify）
// 在 build time auto-import，不需要在此列出。
//
// 新增 Confucian* 元件且引用了新的 Vuetify 元件時，需回來此檔同步加上 import。

export {
	VApp,
	VAppBar,
	VAvatar,
	VBtn,
	VChip,
	VContainer,
	VDivider,
	VFooter,
	VIcon,
	VList,
	VListGroup,
	VListItem,
	VListItemTitle,
	VListSubheader,
	VMain,
	VMenu,
	VNavigationDrawer,
	VSpacer,
	VTooltip
} from "vuetify/components";

export { Ripple } from "vuetify/directives";
