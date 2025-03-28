import { fetchAuthLogin, fetchAuthLogout, fetchEmployeeInfo } from '~/api/modules'
import { router } from '~/router'

export const useUserStore = defineStore(
	'useUserStore',
	() => {
		//用户信息
		const userInfo = ref<IEmployeeEntity>()

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
		return {
			userInfo,
			token,
			login,
			logout,
		}
	},
	{
		persist: {
			storage: localStorage,
		},
	},
)
