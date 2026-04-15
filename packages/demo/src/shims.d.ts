declare module "*.vue" {
	import type { DefineComponent } from "vue";

	const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
	export default component;
}

declare module "*.scss";
declare module "*.css";
declare module "*.svg" {
	const src: string;
	export default src;
}
declare module "*.png" {
	const src: string;
	export default src;
}
declare module "*.jpg" {
	const src: string;
	export default src;
}

interface ImportMetaEnv {
	readonly BASE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
