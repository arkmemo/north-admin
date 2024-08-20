import type { RouteRecordNameGeneric } from 'vue-router'
import { router } from '~/router'

interface TabItem {
	icon: string
	title: string
	path: string
	name: RouteRecordNameGeneric | string
	isKeepAlive: boolean
}

export const useTabsStore = defineStore(
	'useTabsStore',
	() => {
		const tabsList = ref<TabItem[]>([])

		const addTab = (tab: TabItem) => {
			const isExist = tabsList.value.some((item) => item.path === tab.path)
			if (isExist) {
				return
			}

			tabsList.value.push(tab)
		}

		// 删除tab，但是最后一个tab不能删除
		const removeTab = (path: string) => {
			if (tabsList.value.length === 1) {
				return
			}

			const index = tabsList.value.findIndex((item) => item.path === path)
			const nextTab = tabsList.value[index + 1] || tabsList.value[index - 1]
			router.push(nextTab.path)
			tabsList.value = tabsList.value.filter((item) => item.path !== path)
		}

		return {
			tabsList,
			addTab,
			removeTab,
		}
	},
	{
		persist: {
			storage: sessionStorage,
		},
	},
)
