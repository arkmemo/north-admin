import type { RouteRecordRaw } from 'vue-router'
import Layout from '~/layouts/index.vue'

export const MenuRoutes: RouteRecordRaw[] = [
	{
		path: '/system',
		redirect: '/system/menu',
		component: Layout,
		meta: {
			title: '系统配置',
			icon: 'hugeicons:system-update-02',
			isHide: false,
			orderNo: 3,
			isKeepAlive: false,
		},
		children: [
			{
				path: '/system/department',
				name: 'system-department',
				meta: {
					title: '部门管理',
					icon: 'material-symbols:list-alt-add-outline',
					isHide: false,
					orderNo: 1,
					isKeepAlive: false,
				},
				component: () => import('~/pages/system/department/index.vue'),
			},
			{
				path: '/system/menu',
				name: 'system-menu',
				meta: {
					title: '菜单管理',
					icon: 'material-symbols:list-alt-add-outline',
					isHide: false,
					orderNo: 2,
					isKeepAlive: false,
				},
				component: () => import('~/pages/system/menu/index.vue'),
			},
			{
				path: '/system/role',
				name: 'system-role',
				meta: {
					title: '角色管理',
					icon: 'eos-icons:role-binding',
					isHide: false,
					orderNo: 3,
					isKeepAlive: false,
				},
				component: () => import('~/pages/system/role/index.vue'),
			},
		],
	},
]
