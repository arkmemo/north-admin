import { ErrorHandlerMiddleware } from '~/api/types/middleware'
import { router } from '~/router'

export const unauthorizedMiddleware: ErrorHandlerMiddleware = async (error, next) => {
	console.log('notFound-> Before request:', error)
	ElMessage.error('未授权，请重新登录')
	router.replace('/login')

	const response = await next()
	console.log('notFound-> After request:', response)
	return response
}
