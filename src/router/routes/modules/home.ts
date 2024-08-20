import type { RouteRecordRaw } from 'vue-router'
import Layout from '~/layouts/index.vue'

export const HomeRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: 'home',
		component: Layout,
		meta: {
			title: '首页1',
			icon: 'fluent:list-bar-20-filled',
			isHide: false,
			orderNo: 1,
			isKeepAlive: false,
		},
		children: [
			{
				path: '/home',
				name: 'Home',
				component: () => import('~/pages/home/index.vue'),
				meta: {
					title: '首页',
					icon: 'fluent:list-bar-20-filled',
					isHide: false,
					orderNo: 1,
					isKeepAlive: true,
				},
			},
		],
	},
]
