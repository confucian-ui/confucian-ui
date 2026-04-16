// Vuetify 內部 alias → Phosphor icon 名稱對應表
// 完整對照 Vuetify 4 mdi preset（vuetify/lib/iconsets/mdi.js），
// 確保任何元件要用的內部 alias 都能解析到 Phosphor 圖示
//
// 使用字串而非直接 import 元件：Vuetify 的 alias 若 resolve 為元件會改走 VComponentIcon、
// 完全繞過我們的 IconSet adapter，adapter 的 weight 預設就套不到。
// 改放字串讓 adapter 走 resolvePhosphorIcon 的完整流程，自動套用 duotone 預設。
export const phosphorAliases: Record<string, string> = {
	// 狀態
	"complete": "ph-check",
	"cancel": "ph-x-circle",
	"close": "ph-x",
	"delete": "ph-x-circle",
	"clear": "ph-x-circle",
	"success": "ph-check-circle",
	"info": "ph-info",
	"warning": "ph-warning",
	"error": "ph-warning-circle",

	// 方向
	// collapse / expand 故意用同一圖示：v-list-group 會在 open/closed 換這兩個 alias，
	// 我們讓兩者都是 down，再靠 CSS transform 做旋轉過場（見 _sidebar.scss）
	"collapse": "ph-caret-down",
	"expand": "ph-caret-down",
	"prev": "ph-caret-left",
	"next": "ph-caret-right",
	"first": "ph-caret-double-left",
	"last": "ph-caret-double-right",
	"unfold": "ph-arrows-down-up",
	"subgroup": "ph-caret-down",
	"dropdown": "ph-caret-down",

	// 方向箭頭（鍵盤 / 排序）
	"sortAsc": "ph-sort-ascending",
	"sortDesc": "ph-sort-descending",
	"arrowup": "ph-arrow-up",
	"arrowdown": "ph-arrow-down",
	"arrowleft": "ph-arrow-left",
	"arrowright": "ph-arrow-right",

	// 表單輸入
	"checkboxOn": "ph-check-square",
	"checkboxOff": "ph-square",
	"checkboxIndeterminate": "ph-minus-square",
	"radioOn": "ph-check-circle",
	"radioOff": "ph-circle",
	"ratingEmpty": "ph-star",
	"ratingFull": "ph-star",
	"ratingHalf": "ph-star",

	// 常用動作
	"menu": "ph-list",
	"edit": "ph-pencil-simple",
	"file": "ph-paperclip",
	"plus": "ph-plus",
	"minus": "ph-minus",
	"delimiter": "ph-dot-outline",
	"loading": "ph-circle-dashed",
	"calendar": "ph-calendar",
	"upload": "ph-cloud-arrow-up",
	"color": "ph-palette",
	"search": "ph-magnifying-glass",
	"eyeDropper": "ph-eyedropper",

	// Treeview / v-data-table 分組
	"treeviewCollapse": "ph-caret-down",
	"treeviewExpand": "ph-caret-right",
	"tableGroupCollapse": "ph-caret-down",
	"tableGroupExpand": "ph-caret-right",

	// 鍵盤快捷鍵（v-kbd / v-hotkey）
	"command": "ph-command",
	"shift": "ph-arrow-fat-up",
	"enter": "ph-arrow-bend-down-left",
	"backspace": "ph-backspace",

	// 媒體（v-video / v-audio 相關）
	"play": "ph-play",
	"pause": "ph-pause",
	"fullscreen": "ph-corners-out",
	"fullscreenExit": "ph-corners-in",
	"volumeHigh": "ph-speaker-high",
	"volumeMedium": "ph-speaker-low",
	"volumeLow": "ph-speaker-low",
	"volumeOff": "ph-speaker-slash",

	// Confucian 額外的常用 alias（非 Vuetify 內建）
	"confucian-eye": "ph-eye",
	"confucian-eye-off": "ph-eye-slash",
	"confucian-calendar": "ph-calendar",
	"confucian-clock": "ph-clock",
	"confucian-search": "ph-magnifying-glass",
	"confucian-upload": "ph-cloud-arrow-up",

	// 保留 sort（舊版 Vuetify 的 alias，避免漏掉）
	"sort": "ph-sort-ascending",
};
