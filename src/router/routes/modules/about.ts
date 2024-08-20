import type { RouteRecordRaw } from 'vue-router'
import Layout from '~/layouts/index.vue'

export const HomeRoutes: RouteRecordRaw[] = [
	{
		path: '/about',
		component: Layout,
		meta: {
			title: 'about',
			icon: 'fluent:list-bar-20-filled',
			isHide: false,
			orderNo: 2,
			isKeepAlive: true,
		},
		children: [
			{
				path: '/about',
				name: 'About',
				component: () => import('~/pages/about/index.vue'),
				meta: {
					title: 'about',
					icon: 'fluent:list-bar-20-filled',
					isHide: false,
					orderNo: 2,
					isKeepAlive: true,
				},
			},
		],
	},
]
