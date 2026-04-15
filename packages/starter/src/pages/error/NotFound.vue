<template>
	<v-container class="fill-height" fluid>
		<v-row align="center" justify="center">
			<v-col cols="12" md="6" class="text-center">
				<div class="error-code">404</div>
				<h1 class="text-headline-medium confucian-heading mt-4">未見此地</h1>
				<p class="text-body-large text-medium-emphasis mt-2 mb-6">
					此路不通，請返回首頁。
				</p>
				<v-btn color="primary" size="large" to="/">返回首頁</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
</script>

<style scoped>
	.error-code {
		font-family: "Noto Serif TC", "Source Han Serif TC", Georgia, serif;
		font-size: 8rem;
		line-height: 1;
		font-weight: 600;
		color: rgb(var(--v-theme-primary));
		opacity: 0.85;
	}
</style>
