import { ScssVariableEnum } from '~/enum/scssVariableEnum'
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

			// 布局方式
			layoutMode: 'vertical', // horizontal | vertical

			// 侧边栏颜色
			sideBarColor: '#1C1E23',

			// 是否暗黑模式
			isDark: JSON.parse(localStorage.getItem($globalSettingId)!)?.state?.isDark ?? isDark.value,

			// 是否显示tabs
			hasTabs: true,

			// 是否显示面包屑
			hasBreadcrumb: true,

			// 是否显示页脚
			hasFooter: true,

			// 深色菜单
			isDarkMenu: false,
		})

		// 菜单是否垂直布局
		const isVertical = () => state.layoutMode === 'vertical'

		watch(
			() => state.isDarkMenu,
			(val: boolean) => {
				if (val) {
					document.documentElement.classList.add('dark-menu-mixed')
				} else {
					document.documentElement.classList.remove('dark-menu-mixed')
				}
			},
			{
				immediate: true,
			},
		)

		return {
			state,
			isVertical,
		}
	},
	{
		persist: true,
	},
)
