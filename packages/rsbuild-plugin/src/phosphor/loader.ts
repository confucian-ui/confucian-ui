// Rspack loader：掃描單一模組 source 裡的 "ph-xxx" 字串，
// 在檔尾附加 named import + registerPhosphorIcon 呼叫。
//
// 由 plugin.ts 注入到 module rules。仿 webpack-plugin-vuetify 的 loader 手法：
// regex 改寫、不動 AST。

const WEIGHTS = new Set(["thin", "light", "regular", "bold", "fill", "duotone"]);
const ICON_PATTERN = /["']ph-([a-z0-9-]+)["']/g;

function toComponentName(iconName: string): string {
	let base = iconName;
	if(base.startsWith("ph-")) base = base.slice(3);

	const lastDash = base.lastIndexOf("-");
	if(lastDash > 0) {
		const tail = base.slice(lastDash + 1);
		if(WEIGHTS.has(tail)) {
			base = base.slice(0, lastDash);
		}
	}

	return "Ph" + base
		.split(/[-_]/)
		.map(part => part.charAt(0).toUpperCase() + part.slice(1))
		.join("");
}

export default function phosphorTreeshakeLoader(source: string): string {
	// 找出檔案中所有 "ph-xxx" 字串 → 轉 PascalCase → 去重
	const components = new Set<string>();
	let match: RegExpExecArray | null;
	while((match = ICON_PATTERN.exec(source)) !== null) {
		const comp = toComponentName("ph-" + match[1]);
		// 過濾 adapter 的 fallback class 名稱
		if(comp !== "PhIconMissing") {
			components.add(comp);
		}
	}

	if(components.size === 0) return source;

	// 利用 @phosphor-icons/vue 的 sideEffects: false，tree-shake 未用到的 named export
	const names = [...components].sort();
	const registerLines = names.map(
		name => `__phRegister(${JSON.stringify(name)}, __ph_${name});`
	);

	const injection = [
		"",
		"/* --- @confucian-ui/rsbuild-plugin: phosphor icon register --- */",
		`import { registerPhosphorIcon as __phRegister } from "@confucian-ui/vuetify";`,
		`import { ${names.map(n => `${n} as __ph_${n}`).join(", ")} } from "@phosphor-icons/vue";`,
		...registerLines,
		"/* --- end phosphor icon register --- */",
	].join("\n");

	return source + "\n" + injection;
}
