<template>
	<div>
		<ConfucianPageHeader title="使用者" subtitle="團隊成員與存取權限">
			<template #actions>
				<v-btn color="primary" variant="flat" prepend-icon="ph-user-plus">
					新增使用者
				</v-btn>
			</template>
		</ConfucianPageHeader>

		<v-card>
			<v-card-text>
				<v-row align="center" class="mb-2">
					<v-col cols="12" md="4">
						<v-text-field
							v-model="search"
							prepend-inner-icon="$confucian-search"
							placeholder="搜尋姓名、信箱..."
							hide-details
							density="comfortable"
						/>
					</v-col>
					<v-spacer />
					<v-col cols="auto">
						<v-btn-toggle color="secondary" v-model="filterRole" multiple density="comfortable" variant="outlined">
							<v-btn value="admin">管理員</v-btn>
							<v-btn value="editor">編輯</v-btn>
							<v-btn value="viewer">檢視</v-btn>
						</v-btn-toggle>
					</v-col>
				</v-row>

				<v-data-table
					:headers="headers"
					:items="filteredUsers"
					items-per-page="10"
				>
					<template #[`item.user`]="{ item }">
						<div class="d-flex align-center ga-3">
							<v-avatar :color="item.color" size="36">
								<span class="text-body-small font-weight-medium text-white">
									{{ item.name[0] }}
								</span>
							</v-avatar>
							<div>
								<div class="font-weight-medium">{{ item.name }}</div>
								<div class="text-body-small text-medium-emphasis">{{ item.email }}</div>
							</div>
						</div>
					</template>
					<template #[`item.role`]="{ item }">
						<v-chip size="small" :color="roleColor(item.role)" variant="tonal">
							{{ roleLabel(item.role) }}
						</v-chip>
					</template>
					<template #[`item.status`]="{ item }">
						<v-icon :icon="item.active ? 'ph-check-circle' : 'ph-x-circle'"
							:color="item.active ? 'success' : 'error'" size="18" />
						<span class="ml-1 text-body-small">{{ item.active ? "啟用" : "停用" }}</span>
					</template>
					<template #[`item.actions`]="{ }">
						<v-btn variant="text" icon size="small">
							<v-icon icon="$edit" />
						</v-btn>
						<v-btn variant="text" icon size="small" color="error">
							<v-icon icon="ph-trash" />
						</v-btn>
					</template>
				</v-data-table>
			</v-card-text>
		</v-card>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed } from "vue";
	import { ConfucianPageHeader } from "@confucian-ui/vuetify";

	const search = ref("");
	const filterRole = ref<string[]>([]);

	const headers = [
		{ title: "使用者", key: "user", sortable: false },
		{ title: "角色", key: "role" },
		{ title: "部門", key: "department" },
		{ title: "狀態", key: "status" },
		{ title: "加入日期", key: "joined" },
		{ title: "", key: "actions", align: "end" as const, sortable: false },
	];

	const users = ref([
		{ name: "王雅雯", email: "yaven@example.com", role: "admin", department: "產品", active: true, joined: "2024-02-15", color: "primary" },
		{ name: "陳建宏", email: "chienhung@example.com", role: "editor", department: "工程", active: true, joined: "2024-05-02", color: "accent" },
		{ name: "林佳玲", email: "chialing@example.com", role: "viewer", department: "設計", active: true, joined: "2024-09-11", color: "secondary" },
		{ name: "張志遠", email: "zhiyuan@example.com", role: "editor", department: "行銷", active: false, joined: "2023-12-01", color: "warning" },
		{ name: "黃美琪", email: "meichi@example.com", role: "viewer", department: "客服", active: true, joined: "2025-01-20", color: "success" },
		{ name: "李謙", email: "qian@example.com", role: "admin", department: "管理", active: true, joined: "2023-08-14", color: "primary" },
		{ name: "蔡佩珊", email: "peishan@example.com", role: "editor", department: "財務", active: true, joined: "2024-07-22", color: "accent" },
	]);

	// 搜尋 name + email、並同時套 role filter；
	// 直接在 computed 做，不用 v-data-table 的 :search，因為它只比對 headers 裡有的 key
	const filteredUsers = computed(() => {
		const q = search.value.trim().toLowerCase();
		return users.value.filter(u => {
			if(filterRole.value.length > 0 && !filterRole.value.includes(u.role)) return false;
			if(q && !u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false;
			return true;
		});
	});

	const roleLabel = (r: string) => {
		if(r === "admin") return "管理員";
		if(r === "editor") return "編輯";
		return "檢視";
	};

	const roleColor = (r: string) => {
		if(r === "admin") return "primary";
		if(r === "editor") return "accent";
		return "secondary";
	};
</script>
