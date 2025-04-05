import type { RouteRecordRaw } from 'vue-router'
export const RadioFilter = (value: string | number | null, option: object[], key = 'label', valueKey = 'value') => {
	const temp = option.find((item) => item[valueKey as keyof typeof item] === value)

	return (temp && temp[key as keyof typeof temp]) || value
}
export function hasOwnProperty<T, K extends PropertyKey>(obj: T, prop: K): obj is T & Record<K, unknown> {
	return Object.prototype.hasOwnProperty.call(obj, prop)
}

const pagesModules = import.meta.glob('~/pages/**/*.vue', { eager: true })

export const formatMenuToRoute = (menus: EntityMenuEntity[]): RouteRecordRaw[] => {
	return menus.map((menu) => {
		const route: RouteRecordRaw = {
			path: menu.path,
			name: menu.name,
			component: markRaw(pagesModules['/src/pages/system/menu/index.vue'].default),
			meta: {
				title: menu.title,
				icon: menu.icon,
				isHide: Boolean(menu.isHidden),
				orderNo: 2,
				isKeepAlive: false,
			},
		}
		if (menu.children && menu.children.length > 0) {
			route.children = formatMenuToRoute(menu.children)
		}
		return route
	})
}
