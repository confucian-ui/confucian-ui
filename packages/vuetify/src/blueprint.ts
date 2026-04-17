import { confucianLight } from "./theme/light";
import { confucianDark } from "./theme/dark";
import { phosphorAliases } from "./icons/aliases";
import { phosphorIconSet } from "./icons/phosphorSet";
// side-effect：在 library 模組載入時預先註冊自己用到的 Phosphor icon
import "./icons/libraryIcons";

import type { Blueprint, IconAliases } from "vuetify";

const inputBase = {
	variant: "outlined",
	density: "comfortable",
	rounded: "sm",
};

// Confucian 主題的 Vuetify Blueprint
// 消費者可以直接使用 createVuetify({ blueprint: confucianBlueprint })
// 或透過 createConfucian() 包一層，取得主題持久化與系統偏好同步
export const confucianBlueprint: Blueprint = {
	theme: {
		defaultTheme: "confucianLight",
		themes: {
			confucianLight,
			confucianDark,
		},
	},
	icons: {
		defaultSet: "ph",
		aliases: phosphorAliases as unknown as Partial<IconAliases>,
		sets: {
			ph: phosphorIconSet,
		},
	},
	defaults: {
		global: {
			ripple: true,
		},
		// Grid 預設使用 comfortable 密度，讓 row/col gap 從 24px 縮為 16px；
		// Vuetify 會同步調整 col flex-basis 的扣除量，避免 col 撐不滿 row
		VRow: {
			density: "comfortable",
		},
		VCol: {
			density: "comfortable",
		},
		VContainer: {
			density: "comfortable",
		},
		VCard: {
			rounded: "sm",
			flat: true,
			border: "md",
		},
		VCheckbox: {
			color: "primary",
		},
		// v-data-table 的 select 欄內部用 v-checkbox-btn 而非 v-checkbox，
		// defaults 要分開設才能套到
		VCheckboxBtn: {
			color: "primary",
		},
		VRadio: {
			color: "primary",
		},
		VBtn: {
			rounded: "sm",
			class: "confucian-btn",
		},
		VTextField: inputBase,
		VTextarea: inputBase,
		VSelect: inputBase,
		VAutocomplete: inputBase,
		VCombobox: inputBase,
		VFileInput: inputBase,
		VNumberInput: inputBase,
		VOtpInput: inputBase,
		// labs
		VDateInput: inputBase,
		VColorInput: inputBase,
		VMaskInput: inputBase,
		VChip: {
			rounded: "sm",
		},
		VAlert: {
			rounded: "sm",
			variant: "tonal",
			border: "start",
		},
		VDataTable: {
			density: "comfortable",
		},
		VList: {
			density: "comfortable",
		},
		VTabs: {
			density: "comfortable",
		},
		VAppBar: {
			flat: true,
			border: "b-thin",
		},
	},
};
