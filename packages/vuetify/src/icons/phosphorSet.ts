import { h } from "vue";

import type { IconSet, IconProps } from "vuetify";
import type { Component } from "vue";

// Phosphor Icons 的 weight（變體）；"duotone" 為 Confucian 預設，想要其他 weight 以後綴明示
type PhWeight = "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
const WEIGHTS = new Set<string>(["thin", "light", "regular", "bold", "fill", "duotone"]);

// Icon 元件註冊表：key 為 PascalCase 元件名（如 "PhHouse"）。
// 不再用 `import * as` 把 1500+ 個元件全部拉進 bundle——改成由使用端註冊。
// Library 內部用到的 icon 由 libraryIcons.ts 預先註冊；
// 消費端的 icon 由 @confucian-ui/rsbuild-plugin 的 loader 掃描原始碼自動注入。
const registry = new Map<string, Component>();

export function registerPhosphorIcon(componentName: string, component: Component): void {
	registry.set(componentName, component);
}

interface IconComponent {
	component: Component;
	weight: PhWeight;
}

// 將 icon 名解析為 Phosphor 元件 + weight。支援以下輸入格式：
//   "ph-house"              → PhHouse, weight="duotone"（預設）
//   "ph-house-regular"      → PhHouse, weight="regular"（真的想要單色時明示）
//   "ph-house-fill"         → PhHouse, weight="fill"
//   "ph-house-duotone"      → PhHouse, weight="duotone"
//   "ph-house-line-duotone" → PhHouseLine, weight="duotone"
//   "PhHouse"               → PhHouse, weight="duotone"
function resolvePhosphorIcon(name: string): IconComponent | undefined {
	let base = name;
	let weight: PhWeight = "duotone";

	// 剝掉 "ph-" 前綴
	if(base.startsWith("ph-")) {
		base = base.slice("ph-".length);
	}
	// 若以其它命名空間前綴，不處理
	if(base.startsWith("mdi-")) {
		return undefined;
	}

	// 檢查末段是否為 weight 後綴
	const lastDash = base.lastIndexOf("-");
	if(lastDash > 0) {
		const tail = base.slice(lastDash + 1);
		if(WEIGHTS.has(tail)) {
			weight = tail as PhWeight;
			base = base.slice(0, lastDash);
		}
	}

	// kebab-case → PascalCase，加上 "Ph" 前綴
	const normalized = base.startsWith("Ph") ?
		base :
		"Ph" + base
			.split(/[-_]/)
			.map(part => part.charAt(0).toUpperCase() + part.slice(1))
			.join("");

	const component = registry.get(normalized);
	if(!component) return undefined;
	return { component, weight };
}

export const phosphorIconSet: IconSet = {
	component: (props: IconProps) => {
		const iconName = typeof props.icon === "string" ? props.icon : "";

		// 若 icon prop 本身是元件（呼叫端直接傳元件而非圖示名），直接渲染
		// 這條路徑不經 adapter 的 weight 解析 —— 呼叫端需自己傳 weight prop
		if(iconName === "" && props.icon) {
			return h(props.icon as Component);
		}

		const resolved = resolvePhosphorIcon(iconName);
		if(!resolved) {
			return h("span", { class: "ph-icon-missing" }, iconName);
		}
		return h(resolved.component, {
			weight: resolved.weight,
			size: "1.5em",
		});
	},
};
