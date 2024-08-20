import type { RouteRecordRaw } from 'vue-router'
import Layout from '~/layouts/index.vue'

export const MenuRoutes: RouteRecordRaw[] = [
	{
		path: '/menu',
		redirect: '/menu/menu1',
		component: Layout,
		meta: {
			title: '菜单',
			icon: 'fluent:list-bar-20-filled',
			isHide: false,
			orderNo: 3,
			isKeepAlive: false,
		},
		children: [
			{
				path: '/menu/menu1',
				name: 'Menu1',
				meta: {
					title: '菜单1',
					icon: 'fluent:list-bar-20-filled',
					isHide: false,
					orderNo: 2,
					isKeepAlive: false,
				},
				component: () => import('~/pages/menu/menu1/index.vue'),
			},
			{
				path: '/menu/menu2',
				name: 'Menu2',
				meta: {
					title: '菜单2',
					icon: 'fluent:list-bar-20-filled',
					isHide: false,
					orderNo: 1,
					isKeepAlive: false,
				},
				component: () => import('~/pages/menu/menu2/index.vue'),
				children: [
					{
						path: '/menu/menu2/menu21',
						name: 'Menu21',
						meta: {
							title: '菜单2-1',
							icon: 'fluent:list-bar-20-filled',
						},
						component: () => import('~/pages/menu/menu2/menu21/index.vue'),
					},
					{
						path: '/menu/menu2/menu22',
						name: 'Menu22',
						meta: {
							title: '菜单2-2',
							icon: 'fluent:list-bar-20-filled',
						},
						component: () => import('~/pages/menu/menu2/menu22/index.vue'),
						children: [
							{
								path: '/menu/menu2/menu22/menu221',
								name: 'Menu221',
								meta: {
									title: '菜单2-2-1',
									icon: 'fluent:list-bar-20-filled',
								},
								component: () => import('~/pages/menu/menu2/menu22/index.vue'),
							},
						],
					},
				],
			},
			{
				path: '/menu/menu3',
				name: 'Menu3',
				meta: {
					title: '菜单3',
					icon: 'fluent:list-bar-20-filled',
					isHide: false,
					orderNo: 3,
					isKeepAlive: false,
				},
				component: () => import('~/pages/menu/menu3/index.vue'),
			},
		],
	},
]
