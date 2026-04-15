<template>
	<div>
		<ConfucianPageHeader title="排版" subtitle="標題、內文、引文、程式碼的風格規範" />

		<v-row>
			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h1 class="text-display-small confucian-heading">大學之道</h1>
					<h2 class="text-headline-large confucian-heading">在明明德</h2>
					<h3 class="text-headline-medium confucian-heading">在親民</h3>
					<h4 class="text-headline-small confucian-heading">在止於至善</h4>
					<h5 class="text-title-large">標題：title large</h5>
					<h6 class="text-title-medium">副標題：title medium</h6>
					<h6 class="text-title-small">小標題：title small</h6>

					<ConfucianBambooDivider />

					<p class="text-body-large">
						Body large：君子務本，本立而道生。孝弟也者，其為仁之本與。這是一段示範正文，用以展示 UI 介面中主要的閱讀字體與行距。
					</p>
					<p class="text-body-medium mt-3">
						Body medium：子曰：「學而時習之，不亦說乎？有朋自遠方來，不亦樂乎？」此為次要字級的正文樣式。
					</p>
					<p class="text-body-small mt-3">
						Body small：用於圖說或小型說明。
					</p>
				</v-card>
			</v-col>

			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">引文與程式碼</h3>
					<v-alert variant="tonal" color="primary" border="start" class="mb-4">
						<span class="font-italic">「工欲善其事，必先利其器。」</span>
					</v-alert>
					<p class="text-body-medium mb-2">使用 <code>&lt;v-card&gt;</code> 包覆內容，可獲得一致的 3px 圓角與細邊框。</p>
					<CodeBlock lang="ts">
						<pre>
							import { createApp } from "vue";
							import { createConfucian } from "@confucian-ui/vuetify";

							import "vuetify/styles";
							import "@confucian-ui/vuetify/styles";
							import "./styles/app.scss";

							import App from "./App.vue";
							import { router } from "./router";

							const app = createApp(App);

							const confucian = createConfucian();

							app.use(confucian);
							app.use(router);
							app.mount("#app");
						</pre>
					</CodeBlock>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts">
	import { ConfucianPageHeader, ConfucianBambooDivider } from "@confucian-ui/vuetify";

	import CodeBlock from "../../components/CodeBlock.vue";
</script>

<style scoped>
	.code-block {
		font-family: "JetBrains Mono", ui-monospace, monospace;
		font-size: 0.82rem;
		padding: 12px;
		border-radius: 3px;
		background-color: rgba(107, 83, 68, 0.08);
		overflow-x: auto;
		white-space: pre;
	}
</style>
