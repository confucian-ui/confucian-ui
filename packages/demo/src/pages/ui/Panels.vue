<template>
	<div>
		<ConfucianPageHeader title="面板與樹狀" subtitle="v-expansion-panel 與 v-treeview" />

		<v-row>
			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">折疊面板</h3>
					<p class="text-body-medium text-medium-emphasis mb-4">
						可展開/收合的區塊，適合 FAQ、設定群組。
					</p>
					<v-expansion-panels variant="accordion">
						<v-expansion-panel title="仁 — 人與人之間的關懷">
							<v-expansion-panel-text>
								「仁者愛人。」仁是儒家最高的道德標準，主張推己及人、設身處地為他人著想。
							</v-expansion-panel-text>
						</v-expansion-panel>
						<v-expansion-panel title="義 — 行為的正當性">
							<v-expansion-panel-text>
								「義者宜也。」義強調做對的事，是判斷行為合理與否的道德準則。
							</v-expansion-panel-text>
						</v-expansion-panel>
						<v-expansion-panel title="禮 — 社會秩序與規範">
							<v-expansion-panel-text>
								「不學禮，無以立。」禮是維繫社會和諧的外在規範，從日常禮儀到國家制度。
							</v-expansion-panel-text>
						</v-expansion-panel>
						<v-expansion-panel title="智 — 明辨是非的能力">
							<v-expansion-panel-text>
								「知之為知之，不知為不知，是知也。」智是認知與判斷的能力，強調誠實面對自己的無知。
							</v-expansion-panel-text>
						</v-expansion-panel>
						<v-expansion-panel title="信 — 誠實守諾">
							<v-expansion-panel-text>
								「人而無信，不知其可也。」信是人際關係的基石，承諾必須兌現。
							</v-expansion-panel-text>
						</v-expansion-panel>
					</v-expansion-panels>
				</v-card>
			</v-col>

			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">折疊面板 — 多種變體</h3>
					<p class="text-body-medium text-medium-emphasis mb-4">
						Inset 變體（內縮展開）與多選模式。
					</p>
					<v-expansion-panels variant="inset" multiple>
						<v-expansion-panel title="系統設定">
							<v-expansion-panel-text>
								<v-switch label="自動更新" color="primary" hide-details />
								<v-switch label="深色模式" color="primary" hide-details class="mt-2" />
							</v-expansion-panel-text>
						</v-expansion-panel>
						<v-expansion-panel title="通知偏好">
							<v-expansion-panel-text>
								<v-checkbox label="電子郵件通知" color="primary" hide-details />
								<v-checkbox label="推播通知" color="primary" hide-details />
							</v-expansion-panel-text>
						</v-expansion-panel>
						<v-expansion-panel title="隱私設定">
							<v-expansion-panel-text>
								<v-checkbox label="允許分析資料蒐集" color="primary" hide-details />
								<v-checkbox label="顯示線上狀態" color="primary" hide-details />
							</v-expansion-panel-text>
						</v-expansion-panel>
					</v-expansion-panels>
				</v-card>
			</v-col>

			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">樹狀檢視</h3>
					<p class="text-body-medium text-medium-emphasis mb-4">
						v-treeview：階層結構的檢視與選取。
					</p>
					<v-treeview
						v-model:selected="selectedNodes"
						:items="treeItems"
						select-strategy="classic"
						selectable
						open-all
						item-title="name"
						item-value="id"
						color="primary"
					/>
				</v-card>
			</v-col>

			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">樹狀檢視 — 可啟用</h3>
					<p class="text-body-medium text-medium-emphasis mb-4">
						activatable 模式：點擊節點高亮，適合檔案瀏覽器等情境。
					</p>
					<v-treeview
						v-model:activated="activatedNode"
						:items="fileTree"
						activatable
						item-title="name"
						item-value="id"
						color="primary"
						open-all
					>
						<template #prepend="{ item, isOpen }">
							<v-icon v-if="item.children" :icon="isOpen ? 'ph-folder-open' : 'ph-folder'" />
							<v-icon v-else icon="ph-file" />
						</template>
					</v-treeview>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { ConfucianPageHeader } from "@confucian-ui/vuetify";

	const selectedNodes = ref([]);
	const activatedNode = ref([]);

	const treeItems = [
		{
			id: "classics",
			name: "經典",
			children: [
				{
					id: "four-books",
					name: "四書",
					children: [
						{ id: "analerta", name: "論語" },
						{ id: "mencius", name: "孟子" },
						{ id: "great-learning", name: "大學" },
						{ id: "doctrine", name: "中庸" },
					],
				},
				{
					id: "five-classics",
					name: "五經",
					children: [
						{ id: "yijing", name: "易經" },
						{ id: "shijing", name: "詩經" },
						{ id: "shujing", name: "書經" },
						{ id: "liji", name: "禮記" },
						{ id: "chunqiu", name: "春秋" },
					],
				},
			],
		},
	];

	const fileTree = [
		{
			id: "src",
			name: "src",
			children: [
				{
					id: "components",
					name: "components",
					children: [
						{ id: "layout", name: "ConfucianLayout.vue" },
						{ id: "sidebar", name: "ConfucianSidebar.vue" },
						{ id: "appbar", name: "ConfucianAppBar.vue" },
					],
				},
				{
					id: "styles",
					name: "styles",
					children: [
						{ id: "index-scss", name: "index.scss" },
						{ id: "variables", name: "_variables.scss" },
						{ id: "sidebar-scss", name: "_sidebar.scss" },
					],
				},
				{ id: "main-ts", name: "main.ts" },
				{ id: "app-vue", name: "App.vue" },
			],
		},
	];
</script>
