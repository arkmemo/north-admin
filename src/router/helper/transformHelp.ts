import type { RouteRecordRaw } from 'vue-router'

export const moduleToRoutes = (modules: Record<string, unknown>) => {
	const routes: RouteRecordRaw[] = []
	for (const key in modules) {
		const moduleRoutes = modules[key]

		const keys = Object.keys(moduleRoutes as object)
		// 拿到moduleRoutesResult的全部导出
		keys.forEach((key: string) => {
			routes.push(...((moduleRoutes as Record<string, object>)[key] as RouteRecordRaw[]))
		})
	}

	return routes
}

export const routesToMenu = (routes: RouteRecordRaw[]) => {
	const menus: RouteRecordRaw[] = []
	// 如果有children 并且children的长度等于1，那么就是一个单菜单，否则就是一个多菜单
	routes.forEach((route) => {
		if (route.children && route.children.length === 1) {
			menus.push({
				...route.children[0],
				children: [],
			})
		} else if (route.children && route.children.length > 1) {
			menus.push({
				...route,
				children: route.children,
			})
		}
	})
	return menus
}
