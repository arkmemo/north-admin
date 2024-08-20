import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 导入样式

import { RequestMiddleware } from '~/api/types/middleware'

// 请求进度条中间件
export const progressMiddleware: RequestMiddleware = async (_, next) => {
	NProgress.start() // 开始进度条
	try {
		const response = await next()
		NProgress.done() // 结束进度条
		return response
	} catch (error) {
		NProgress.done() // 结束进度条，即使请求失败也结束进度条
		console.log('error progress', error)

		throw error
	}
}
