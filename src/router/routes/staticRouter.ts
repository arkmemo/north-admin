import type { RouteRecordRaw } from 'vue-router'

export const staticRouter: RouteRecordRaw[] = [
	{
		path: '/login',
		name: 'login',
		component: () => import('~/pages/login/index.vue'),
	},
]
