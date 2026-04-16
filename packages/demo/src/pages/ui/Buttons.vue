<template>
	<div>
		<ConfucianPageHeader title="按鈕" subtitle="各種變體與狀態" />

		<v-row>
			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">變體</h3>
					<div class="d-flex flex-wrap ga-2 mb-4">
						<v-btn color="primary">Flat</v-btn>
						<v-btn color="primary" variant="tonal">Tonal</v-btn>
						<v-btn color="primary" variant="outlined">Outlined</v-btn>
						<v-btn color="primary" variant="text">Text</v-btn>
						<v-btn color="primary" variant="elevated">Elevated</v-btn>
					</div>
					<ConfucianBambooDivider />
					<h3 class="text-title-large mb-4">顏色</h3>
					<div class="d-flex flex-wrap ga-2">
						<v-btn color="primary">Primary</v-btn>
						<v-btn color="primary-darken-1">Primary darken</v-btn>
						<v-btn color="secondary">Secondary</v-btn>
						<v-btn color="secondary-darken-1">Secondary darken</v-btn>
						<v-btn color="accent">Accent</v-btn>
						<v-btn color="success">Success</v-btn>
						<v-btn color="warning">Warning</v-btn>
						<v-btn color="info">Info</v-btn>
						<v-btn color="error">Error</v-btn>
					</div>
				</v-card>
			</v-col>

			<v-col cols="12" md="6">
				<v-card class="pa-6">
					<h3 class="text-title-large mb-4">尺寸</h3>
					<div class="d-flex flex-wrap align-center ga-2 mb-4">
						<v-btn color="primary" size="x-small">X-small</v-btn>
						<v-btn color="primary" size="small">Small</v-btn>
						<v-btn color="primary">Default</v-btn>
						<v-btn color="primary" size="large">Large</v-btn>
						<v-btn color="primary" size="x-large">X-large</v-btn>
					</div>
					<ConfucianBambooDivider />
					<h3 class="text-title-large mb-4">icon 與載入</h3>
					<div class="d-flex flex-wrap ga-2">
						<v-btn color="primary" prepend-icon="ph-download-simple">下載</v-btn>
						<v-btn color="primary" append-icon="ph-arrow-right">下一步</v-btn>
						<v-btn color="primary" icon><v-icon icon="ph-heart" /></v-btn>
						<v-btn color="primary" :loading="true">處理中</v-btn>
						<v-btn color="primary" disabled>停用</v-btn>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts">
	import { ConfucianPageHeader, ConfucianBambooDivider } from "@confucian-ui/vuetify";
</script>
