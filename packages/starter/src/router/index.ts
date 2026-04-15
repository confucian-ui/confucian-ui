import { createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "../layouts/DefaultLayout.vue";
import BlankLayout from "../layouts/BlankLayout.vue";

import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		component: DefaultLayout,
		children: [
			{
				path: "",
				name: "home",
				component: () => import("../pages/Home.vue"),
				meta: { title: "首頁" },
			},
		],
	},
	{
		path: "/auth",
		component: BlankLayout,
		children: [
			{
				path: "login",
				name: "login",
				component: () => import("../pages/auth/Login.vue"),
				meta: { title: "登入" },
			},
		],
	},
	{
		path: "/error",
		component: BlankLayout,
		children: [
			{
				path: "404",
				name: "error-404",
				component: () => import("../pages/error/NotFound.vue"),
				meta: { title: "404 頁面不存在" },
			},
			{
				path: "500",
				name: "error-500",
				component: () => import("../pages/error/ServerError.vue"),
				meta: { title: "500 伺服器錯誤" },
			},
		],
	},
	{
		path: "/:pathMatch(.*)*",
		redirect: "/error/404",
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior() {
		return { top: 0 };
	},
});

router.afterEach(to => {
	const title = typeof to.meta.title === "string" ? to.meta.title : "";
	document.title = title ? `${title} | Confucian` : "Confucian";
});
