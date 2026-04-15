// Confucian 主題色票常數
// 意象：淺色 = 攤開的宣紙（日光下的書桌）；深色 = 深夜的書齋（燈下的黑檀木）
// 取材：竹簡、宣紙、墨色、黑檀木、燭火
// 所有 hex 值以不含空格的字串儲存，方便 ThemeDefinition 直接引用

export const tokens = {
	// 朱紅 — 新 primary；取自官印、丹書氣質
	vermilionRed: "#A3342A",
	vermilionRedDark: "#C4554B",
	// 竹黃褐 — 保留備用
	bambooLight: "#C8833F",
	bambooDark: "#D9A877",

	// 赭石褐 — 次要色，沉穩
	ochre: "#6B5344",
	ochreLight: "#8B7560",

	// 古銅色 — sidebar icon 點綴
	bronze: "#A67F56",

	// 竹青 — 點綴用，生機
	bambooGreen: "#4A7C59",
	bambooGreenLight: "#6A9E78",

	// 語意色（刻意降飽和，融入暖色系）
	// 橄欖柳綠：偏暖偏暗，在宣紙色上沉穩
	willowGreen: "#8FA960",
	// 硃砂橙：高彩度橙，與竹黃褐 primary 拉開色相
	vermilion: "#E88A1C",
	// Error 色：取「惡紫之奪朱」（《論語·陽貨》）典故，以紫為戒色
	// 偏紅方向的暗紫紅：保留紅底的警示感，同時不與 primary 朱紅重疊
	forbidPurple: "#6B2348",
	// 青藍：info 用，冷色對比
	skyInk: "#4A7B9E",

	// 淺色模式底色
	xuanPaper: "#FFFBF5",
	surfaceLight: "#F8F6E7",
	// 中性強調塊：thead、chip、date-picker range 中段、empty state 等共用
	surfaceVariantLight: "#E5D8C3",
	// 側欄選取項背景（sidebar active）
	sidebarActiveLight: "#E5D8C3",

	// 深色模式底色
	charredInk: "#0A0805",
	// body 背景：偏冷暗灰
	surfaceDark: "#212429",
	// card 內部底色：比 body 略深
	cardSurfaceDark: "#20252B",
	// 中性強調塊：thead 等共用
	surfaceVariantDark: "#2D363D",
	// 側欄選取深色版
	sidebarActiveDark: "#4A3017",
	// 特化卡片（KPI）漸層兩端：由上到下
	cardEmphasisDarkTop: "#4E3F2A",
	cardEmphasisDarkBottom: "#333528",

	// 側欄（light 模式）：米黃底 + 深色文字
	sidebarBg: "#F8F6E7",
	sidebarSurface: "#EFEBD4",
	sidebarFg: "#2B2622",
	sidebarFgMuted: "#7A6E5E",
	// 側欄（dark 模式）：黑檀木 + 淺色文字
	sidebarBgDark: "#211215",
	sidebarSurfaceDark: "#363029",
	sidebarFgDark: "#E8DFD3",
	sidebarFgMutedDark: "#B8B0A3",

	// 文字色
	onSurfaceLight: "#2B2622",
	onSurfaceDark: "#E5DBC2",
	onPrimary: "#FFFFFF",

	// 邊框色
	borderLight: "#D8CBB5",
	borderDark: "#3D332A",
} as const;

export type ConfucianTokens = typeof tokens;
