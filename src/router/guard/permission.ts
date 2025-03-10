import type { Router } from 'vue-router'

export const setupPermission = (router: Router) => {
	const whiteList = ['/login', '/404']

	router.beforeEach((to, _, next) => {
		const userStore = useUserStore()
		if (whiteList.includes(to.path)) {
			next()
		} else {
			const token = userStore.token
			if (!token) {
				next('/login')
			} else {
				next()
			}
		}
	})
}
