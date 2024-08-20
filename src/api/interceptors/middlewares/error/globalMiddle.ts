import { ErrorHandlerMiddleware } from '~/api/types/middleware'

export const globalErrorMiddleware: ErrorHandlerMiddleware = async (error, next) => {
	console.log('error.name', error.name)

	if (error.name === 'BusinessLogicError') {
		console.error('捕获到业务逻辑错误:', error.message)
		ElMessage.error(`业务逻辑错误: ${error.message}`)
	} else {
		if (error.response?.status !== 404) {
			console.error('捕获到非业务逻辑错误:', error)
			ElMessage.error(`${error.message} ${error.code}`)
		}
	}

	// 继续传递错误给下一个错误处理中间件
	const response = await next()
	return response
}
