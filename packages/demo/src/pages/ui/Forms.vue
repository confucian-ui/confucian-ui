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
		</v-row>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { ConfucianPageHeader } from "@confucian-ui/vuetify";

	const text = ref("");
	const select = ref(null);
	const items = ["仁", "義", "禮", "智", "信"];
	const check = ref(true);
	const radio = ref("monthly");
	const slider = ref(45);
	const rating = ref(4);
</script>
