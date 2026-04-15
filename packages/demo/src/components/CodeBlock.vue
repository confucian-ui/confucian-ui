<template>
	<!-- slot 容器用 <pre>：Vue compiler 對 <pre> 內部不做 whitespace 壓縮（isPreTag 生效），
	     換行與縮排完整保留。元件掛載後從 template ref 讀 textContent，再交給 shiki。
	     使用端記得也把程式碼包在 <pre> 內傳進 slot。 -->
	<pre ref="sourceRef" hidden><slot /></pre>

	<!-- eslint-disable vue/no-v-html -- shiki 產出受信任的 HTML -->
	<pre v-if="html" class="code-block" v-html="html" />
	<pre v-else class="code-block code-block--fallback">{{ code }}</pre>
	<!-- eslint-enable vue/no-v-html -->
</template>

<script setup lang="ts">
	import { onMounted, ref, shallowRef, useTemplateRef, watch } from "vue";
	import { codeToHtml } from "shiki";

	interface Props {
		lang?: string;
	}
	const props = withDefaults(defineProps<Props>(), {
		lang: "ts",
	});

	const sourceRef = useTemplateRef<HTMLDivElement>("sourceRef");
	const code = ref("");
	const html = shallowRef("");

	// 移除所有非空行的共同前導空白，讓使用者可以在 <template> 裡用正常縮排書寫
	function dedent(text: string): string {
		const lines = text.split("\n");
		const indents = lines
			.filter(l => l.trim().length > 0)
			.map(l => l.match(/^[\t ]*/)?.[0].length ?? 0);
		if(indents.length === 0) return text;
		const min = Math.min(...indents);
		return lines.map(l => l.slice(min)).join("\n");
	}

	onMounted(() => {
		const raw = sourceRef.value?.textContent ?? "";
		code.value = dedent(raw).replace(/^\n+|\n+$/g, "");
	});

	// shiki 採 dual-theme：同時渲染兩組主題，以 CSS variable 區分，
	// 再由 <html data-confucian-theme="..."> 切換（見下方 style）
	watch([code, () => props.lang], async ([src, lang]) => {
		if(!src) {
			html.value = "";
			return;
		}
		html.value = await codeToHtml(src, {
			lang,
			themes: {
				light: "vitesse-light",
				dark: "vitesse-dark",
			},
			cssVariablePrefix: "--shiki-",
			defaultColor: false,
		});
	}, { immediate: true });
</script>

<style scoped>
	.code-block {
		font-family: "JetBrains Mono", ui-monospace, monospace;
		font-size: 0.82rem;
		padding: 12px;
		border-radius: 3px;
		overflow-x: auto;
		white-space: pre;
		padding-block: 0;
	}

	.code-block,
	.code-block :deep(.shiki) {
		background-color: rgba(107, 83, 68, 0.08);
	}
</style>

<!-- 非 scoped：shiki dual-theme 的 CSS variable 需要根元素的 data-confucian-theme
     才能決定套哪組色；scoped 下無法從 .code-block 反向選擇祖先。
     不讀 --shiki-*-bg：讓 token span 不帶自己的底色，整個 block 維持暖米背景 -->
<style>
	html[data-confucian-theme="light"] .shiki,
	html[data-confucian-theme="light"] .shiki span {
		color: var(--shiki-light);
	}

	html[data-confucian-theme="dark"] .shiki,
	html[data-confucian-theme="dark"] .shiki span {
		color: var(--shiki-dark);
	}
</style>
