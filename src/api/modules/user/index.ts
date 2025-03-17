import { get, post } from '../../request'

//登录
export const fetchAuthLogin = (params: IAuthLogin) => post<string>('/auth/login', params)

//登出
export const fetchAuthLogout = () => post<boolean>('/auth/logout')

//获取用户信息
export const fetchUserInfo = () => get<IUserInfo>('/user')

// 短信验证码
export const fetchSmsCode = (phone: string) => get<boolean>('/otp/phone/send/' + phone)
