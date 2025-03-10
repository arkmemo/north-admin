import { get,post } from '../../request'

//登录
export const fetchAuthLogin = (params: IAuthLogin) => post<string>('/auth/login', params)

//登出
export const fetchAuthLogout = () => get<string>('/auth/logout')

//获取用户信息
export const fetchUserInfo = () => get<IUserInfo>('/user')
