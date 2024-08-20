import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ErrorHandlerMiddleware, RequestMiddleware, ResponseMiddleware } from '../types/middleware'

export const useRequestMiddlewareRunner = (config: InternalAxiosRequestConfig, middlewares: RequestMiddleware[]) => {
	const runner = middlewares.reduceRight<() => Promise<InternalAxiosRequestConfig<any>>>(
		(next, middleware) => {
			return () => middleware(config, next)
		},
		() => Promise.resolve(config),
	)

	return runner()
}

export const useErrorMiddlewareRunner = (error: any, middlewares: ErrorHandlerMiddleware[]) => {
	// 使用 reduceRight 从右到左构建中间件链条
	const runner = middlewares.reduceRight<() => Promise<any>>(
		(next, errorHandler) => {
			// 返回一个函数，该函数会调用当前的 errorHandler 中间件，并传入 next 作为下一步
			return () => errorHandler(error, next)
		},

		// 初始的 next 返回值，表示处理链的末尾
		() => Promise.reject(error),
	)

	// 执行构建的中间件链条，并返回最终的 Promise
	return runner()
}

export const useResponseMiddlewareRunner = (
	response: AxiosResponse,
	responseMiddlewares: ResponseMiddleware[],
): Promise<AxiosResponse> => {
	// 使用 reduceRight 从右到左构建中间件链条
	const runner = responseMiddlewares.reduceRight<(modifiedResponse?: AxiosResponse) => Promise<AxiosResponse>>(
		(next, responseMiddleware) => {
			// 返回一个函数，该函数会调用当前的 responseMiddleware 中间件，并传入 next 作为下一步
			return (modifiedResponse) => responseMiddleware(modifiedResponse || response, next)
		},
		// 初始的 next 返回值，表示处理链的末尾，直接返回响应
		(modifiedResponse) => Promise.resolve(modifiedResponse || response),
	)

	// 执行构建的中间件链条，并返回最终的 Promise
	return runner()
}
