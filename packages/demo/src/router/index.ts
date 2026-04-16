import { createRouter, createWebHashHistory } from "vue-router";

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
			{
				path: "dashboard",
				name: "dashboard",
				component: () => import("../pages/dashboard/Analytics.vue"),
				meta: { title: "儀表板" },
			},
			{
				path: "users",
				name: "users",
				component: () => import("../pages/users/UserList.vue"),
				meta: { title: "使用者" },
			},
			{
				path: "orders",
				name: "orders",
				component: () => import("../pages/data/OrderTable.vue"),
				meta: { title: "訂單" },
			},
			{
				path: "ui/typography",
				name: "ui-typography",
				component: () => import("../pages/ui/Typography.vue"),
				meta: { title: "排版" },
			},
			{
				path: "ui/buttons",
				name: "ui-buttons",
				component: () => import("../pages/ui/Buttons.vue"),
				meta: { title: "按鈕" },
			},
			{
				path: "ui/cards",
				name: "ui-cards",
				component: () => import("../pages/ui/Cards.vue"),
				meta: { title: "卡片" },
			},
			{
				path: "ui/alerts",
				name: "ui-alerts",
				component: () => import("../pages/ui/Alerts.vue"),
				meta: { title: "警示" },
			},
			{
				path: "ui/forms",
				name: "ui-form-elements",
				component: () => import("../pages/ui/Forms.vue"),
				meta: { title: "表單元件" },
			},
			{
				path: "ui/dialogs",
				name: "ui-dialogs",
				component: () => import("../pages/ui/Dialogs.vue"),
				meta: { title: "對話框" },
			},
			{
				path: "ui/datetime",
				name: "ui-datetime",
				component: () => import("../pages/ui/DateTime.vue"),
				meta: { title: "日期時間" },
			},
			{
				path: "charts",
				name: "charts",
				component: () => import("../pages/charts/ApexCharts.vue"),
				meta: { title: "圖表" },
			},
			{
				path: "forms/basic",
				name: "forms-basic",
				component: () => import("../pages/forms/Basic.vue"),
				meta: { title: "基本表單" },
			},
			{
				path: "forms/advanced",
				name: "forms-advanced",
				component: () => import("../pages/forms/Advanced.vue"),
				meta: { title: "進階表單" },
			},
			{
				path: "profile",
				name: "profile",
				component: () => import("../pages/profile/Profile.vue"),
				meta: { title: "個人資料" },
			},
			{
				path: "pricing",
				name: "pricing",
				component: () => import("../pages/pricing/Pricing.vue"),
				meta: { title: "定價方案" },
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
			{
				path: "register",
				name: "register",
				component: () => import("../pages/auth/Register.vue"),
				meta: { title: "註冊" },
			},
			{
				path: "forgot",
				name: "forgot",
				component: () => import("../pages/auth/Forgot.vue"),
				meta: { title: "忘記密碼" },
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
	// GitHub Pages 靜態託管無 SPA fallback，改用 hash history 避免 refresh 404
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes,
	scrollBehavior() {
		return { top: 0 };
	},
});

router.afterEach(to => {
	const title = typeof to.meta.title === "string" ? to.meta.title : "";
	document.title = title ? `${title} | Confucian Demo` : "Confucian Demo";
});
