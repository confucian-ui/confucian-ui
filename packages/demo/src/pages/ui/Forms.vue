<template>
	<div>
		<ConfucianPageHeader title="表單元件" subtitle="常見輸入元件展示" />

		<v-row>
			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">文字輸入</h3>
					<v-text-field v-model="text" label="預設" />
					<v-text-field v-model="text" label="含 icon" prepend-inner-icon="ph-user" />
					<v-text-field v-model="text" label="錯誤狀態" error-messages="此欄位為必填" />
					<v-text-field v-model="text" label="停用" disabled />
					<v-textarea v-model="text" label="多行文字" rows="3" />
				</v-card>
			</v-col>

			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">選擇器</h3>
					<v-select v-model="select" :items="items" label="Select" />
					<v-autocomplete v-model="select" :items="items" label="Autocomplete" />
					<v-combobox v-model="select" :items="items" label="Combobox" />
					<v-combobox
						v-model="tags"
						:items="tagOptions"
						label="標籤（多選 Chip）"
						multiple
						chips
						closable-chips
					/>
					<v-file-input label="檔案上傳"
						prepend-icon="" prepend-inner-icon="$confucian-upload" />
				</v-card>
			</v-col>

			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">切換</h3>
					<v-checkbox v-model="check" label="同意條款" />
					<v-switch v-model="check" label="啟用通知" color="primary" />
					<v-radio-group v-model="radio">
						<v-radio label="月付方案" value="monthly" />
						<v-radio label="年付方案（省 20%）" value="yearly" />
					</v-radio-group>
				</v-card>
			</v-col>

			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">滑桿與評分</h3>
					<v-slider v-model="slider" color="primary" step="1" min="0" max="100" />
					<div class="text-body-small mb-4">目前：{{ slider }}</div>
					<v-rating v-model="rating" color="primary" />
				</v-card>
			</v-col>

			<v-col cols="12">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">進度條</h3>
					<p class="text-body-medium text-medium-emphasis mb-4">
						v-progress-linear 的多種變體：確定值、不確定（loading）、分段顏色。
					</p>
					<div class="text-body-small mb-1">上傳進度 — {{ progress }}%</div>
					<v-progress-linear v-model="progress" color="primary" height="8" rounded class="mb-4" />
					<div class="text-body-small mb-1">資料載入中</div>
					<v-progress-linear indeterminate color="accent" height="6" rounded class="mb-4" />
					<div class="text-body-small mb-1">磁碟用量 — 警告</div>
					<v-progress-linear :model-value="82" color="warning" bg-color="surface-variant" height="8" rounded class="mb-4" />
					<div class="text-body-small mb-1">帶 buffer 的串流進度</div>
					<v-progress-linear :model-value="45" buffer-value="70" color="primary" height="8" rounded stream />
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { ConfucianPageHeader } from "@confucian-ui/vuetify";

	const text = ref("");
	const select = ref(null);
	const items = ["仁", "義", "禮", "智", "信"];
	const tags = ref(["儒學", "經典"]);
	const tagOptions = ["儒學", "經典", "哲學", "歷史", "文學", "教育"];
	const check = ref(true);
	const radio = ref("monthly");
	const slider = ref(45);
	const rating = ref(4);
	const progress = ref(62);
</script>
