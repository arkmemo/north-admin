import { ErrorHandlerMiddleware } from '~/api/types/middleware'

export const notFoundMiddleware: ErrorHandlerMiddleware = async (error, next) => {
	console.log('notFound-> Before request:', error)
	ElMessage.error('请求资源不存在')
	const response = await next()
	console.log('notFound-> After request:', response)
	return response
}
