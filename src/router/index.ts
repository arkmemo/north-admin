import { createRouter, createWebHashHistory } from 'vue-router'
// import { getDynamicRouter } from './routes/dynamicRouter.ts'
import { staticRouter } from '~/router/routes/staticRouter.ts'
import { setupPermission } from './guard/permission.ts'
import { setupProgress } from './guard/progress.ts'

export const router = createRouter({
	history: createWebHashHistory(),
	routes: [...staticRouter],
})

setupPermission(router)
setupProgress(router)
// const list = [
// 	{
// 		id: 2,
// 		name: 'user-management',
// 		path: '/user-111',
// 		redirect: '',
// 		icon: 'material-symbols:person-outline',
// 		title: '用户管理',
// 		component: '/src/pages/about/index.vue',
// 		menuType: 'C',
// 		parentId: 1,
// 		sort: 1,
// 		status: 1,
// 		isFrame: 0,
// 		isCache: 1,
// 		isHidden: 0,
// 		isHome: 0,
// 		code: '',
// 		children: null,
// 		createdAt: '2025-03-13 21:06:20',
// 		updatedAt: '2025-03-13 21:06:20',
// 	},
// ]

// list.forEach((item) => {
// 	router.addRoute({
// 		path: item.path,
// 		name: item.name,
// 		meta: {
// 			title: item.title,
// 			icon: item.icon,
// 			isHide: false,
// 			orderNo: 2,
// 			isKeepAlive: false,
// 		},
// 		component: () => import(item.component),
// 	})
// })
