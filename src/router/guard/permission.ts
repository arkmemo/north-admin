import type { Router } from 'vue-router'

export const setupPermission = (router: Router) => {
	const whiteList = ['/login', '/404']

	router.beforeEach(async (to, from, next) => {
		const routerStore = useUserStore()
		await routerStore.handleRoutes()
		console.log(routerStore.menuTreeData, 'routerStore.menuTreeData')
		router.addRoute(routerStore.menuTreeData)
		if (whiteList.includes(to.path)) {
			next()
		} else {
			if (!routerStore.token) {
				next('/login')
			} else {
				next()
			}
		}
	})
}
