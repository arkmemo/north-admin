import { fetchAuthLogin, fetchAuthLogout, fetchEmployeeInfo, fetchGetMenuTree } from '~/api/modules'
import { router } from '~/router'
import Layout from '~/layouts/index.vue'
import { formatMenuToRoute } from '~/utils'

export const useUserStore = defineStore(
	'useUserStore',
	() => {
		//用户信息
		const userInfo = ref<IEmployeeEntity>()
		//菜单树
		const menuTreeData = ref<EntityMenuEntity[]>(
			localStorage.getItem('useUserStore') ? JSON.parse(localStorage.getItem('useUserStore')!)?.menuTreeData : [],
		)
		const token = ref<string>()

		//登录
		const login = (user: IAuthLogin) => {
			return new Promise((resolve, reject) => {
				fetchAuthLogin(user)
					.then(async ({ data }) => {
						token.value = data
						getUserInfo()
						//登录成功
						resolve(true)
					})
					.catch((err) => {
						//登录失败
						reject(err)
					})
			})
		}

		//登出
		const logout = () => {
			fetchAuthLogout()
				.then(() => {
					token.value = undefined
					userInfo.value = undefined
					localStorage.clear()
				})
				.finally(() => {
					router.replace('/login')
				})
		}

		//获取用户信息
		const getUserInfo = () => {
			fetchEmployeeInfo().then((res) => {
				userInfo.value = res.data
			})
		}
		const handleRoutes = async () => {
			const baseRoute = {
				path: '/',
				component: Layout,
				children: [],
			}

			const res = await fetchGetMenuTree()
			const routes = formatMenuToRoute(res.data)
			baseRoute.children = routes
			menuTreeData.value = baseRoute
		}
		return {
			userInfo,
			token,
			login,
			logout,
			menuTreeData,
			handleRoutes,
		}
	},
	{
		persist: {
			storage: localStorage,
		},
	},
)
