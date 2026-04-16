<template>
	<div>
		<ConfucianPageHeader title="Confucian" subtitle="以儒家氣質為靈感的 Vuetify 4 admin template" />

		<v-row>
			<v-col cols="12" md="6">
				<v-card class="pa-6 h-100">
					<div class="d-flex align-center mb-4">
						<h3 class="text-title-large confucian-heading">
							<v-icon icon="ph-book-open" size="1.2em" color="primary" class="mr-3" style="vertical-align: -0.25em;" />攤開的宣紙
						</h3>
					</div>
					<p class="text-body-medium text-medium-emphasis">
						淺色模式取意「日光下伏案書寫」：米黃紙面、深褐墨跡、竹黃褐燭火點綴。
					</p>
				</v-card>
			</v-col>
			<v-col cols="12" md="6">
				<v-card class="pa-6 h-100">
					<div class="d-flex align-center mb-4">
						<h3 class="text-title-large confucian-heading">
							<v-icon icon="ph-moon-stars" size="1.2em" color="primary" class="mr-3" style="vertical-align: -0.25em;" />深夜的書齋
						</h3>
					</div>
					<p class="text-body-medium text-medium-emphasis">
						深色模式取意「書童燈下讀書」：冷暗灰的夜幕、黑檀木的書架、暖光燈罩透出的竹黃褐。
					</p>
				</v-card>
			</v-col>
		</v-row>

		<v-card class="pa-6 mt-4">
			<h3 class="text-title-large confucian-heading mb-4">設計理念</h3>
			<v-list :lines="false" bg-color="transparent">
				<v-list-item prepend-icon="ph-palette">
					<v-list-item-title>色彩同源</v-list-item-title>
					<v-list-item-subtitle>
						primary 採竹黃褐（淺色 #C8833F、深色 #D9A877），深淺模式同色系保品牌一致
					</v-list-item-subtitle>
				</v-list-item>
				<v-divider class="my-1 d-sm-none"/>
				<v-list-item prepend-icon="ph-square">
					<v-list-item-title>中庸圓角</v-list-item-title>
					<v-list-item-subtitle>
						微圓角，在方正與柔和之間取中庸
					</v-list-item-subtitle>
				</v-list-item>
				<v-divider class="my-1 d-sm-none"/>
				<v-list-item prepend-icon="ph-yin-yang">
					<v-list-item-title>Duotone 圖示</v-list-item-title>
					<v-list-item-subtitle>
						Phosphor duotone 在純線與純填之間取雙層次，呼應「過猶不及」
					</v-list-item-subtitle>
				</v-list-item>
				<v-divider class="my-1 d-sm-none"/>
				<v-list-item prepend-icon="ph-wave-square">
					<v-list-item-title>回字紋卡片</v-list-item-title>
					<v-list-item-subtitle>
						&lt;v-card&gt; 四角以 SVG mask 繪製隨邊框色同步的回字紋裝飾，象徵傳承
					</v-list-item-subtitle>
				</v-list-item>
				<v-divider class="my-1 d-sm-none"/>
				<v-list-item prepend-icon="ph-waves">
					<v-list-item-title>背景紋路</v-list-item-title>
					<v-list-item-subtitle>
						利用 SVG feTurbulence 做出紙質和木紋紋路
					</v-list-item-subtitle>
				</v-list-item>
			</v-list>
		</v-card>

		<v-card class="pa-6 mt-4">
			<h3 class="text-title-large confucian-heading mb-4">專案資訊</h3>
			<p class="text-body-medium text-medium-emphasis mb-4">
				Confucian 採 pnpm workspace monorepo 管理，核心套件
				<code>@confucian-ui/vuetify</code> 發布至 npm，另附完整功能 demo 與乾淨起始範本。
			</p>
			<div class="d-flex ga-2 flex-wrap">
				<v-btn color="primary" variant="flat" prepend-icon="ph-github-logo"
					href="https://github.com/confucian-ui/confucian-ui" target="_blank" rel="noopener">
					GitHub
				</v-btn>
				<v-btn variant="outlined" prepend-icon="ph-package" href="https://www.npmjs.com/package/@confucian-ui/vuetify"
					target="_blank" rel="noopener">
					npm
				</v-btn>
			</div>
		</v-card>
	</div>
</template>

<script setup lang="ts">
	import { ConfucianPageHeader } from "@confucian-ui/vuetify";
</script>
