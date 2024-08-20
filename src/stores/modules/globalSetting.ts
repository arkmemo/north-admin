import { useTheme } from '~/hooks'

export const $globalSettingId = 'globalSettingStore'
const { isDark } = useTheme()

export const useGlobalSettingStore = defineStore(
	$globalSettingId,
	() => {
		const state = reactive({
			// 打开设置面板
			openSettingPanel: false,

			// 菜单栏宽度
			sideBarWidth: 220,

			// 菜单栏是否收起
			collapsed: true,

			// 是否显示右侧菜单
			rightSideBar: false,

			// 是否暗黑模式
			isDark: JSON.parse(localStorage.getItem($globalSettingId)!)?.state?.isDark ?? isDark.value,

			// 是否显示tabs
			hasTabs: true,

			// 是否显示面包屑
			hasBreadcrumb: true,

			// 是否显示页脚
			hasFooter: true,
		})

		return {
			state,
		}
	},
	{
		persist: true,
	},
)
