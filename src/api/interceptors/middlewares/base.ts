import { RequestMiddleware, ErrorHandlerMiddleware, ResponseMiddleware } from '~/api/types/middleware'
import { useErrorMiddlewareRunner, useRequestMiddlewareRunner, useResponseMiddlewareRunner } from '../middlewareRunner'

export class BaseMiddleware {
	// 这里需要有三个中间件变量，分别对应响应、请求、错误处理
	// 这里的中间件数组是一个数组，因为可能有多个中间件

	// 请求中间件
	requestMiddlewares: RequestMiddleware[] = []

	// 响应中间件
	responseMiddlewares: ResponseMiddleware[] = []

	// 错误处理中间件
	errorMiddlewares: ErrorHandlerMiddleware[] = []

	// 添加请求中间件
	// 添加中间件可能会有多个，可能传递的数据是中间件、也可能是中间件数组
	// 所以这里使用了函数重载
	// 如果传递的是数组，那么就使用扩展运算符将数组中的中间件添加到 requestMiddlewares 中
	// 如果传递的是单个中间件，那么直接将中间件添加到 requestMiddlewares 中
	useRequestMiddleware(middleware: RequestMiddleware): this
	useRequestMiddleware(middlewares: RequestMiddleware[]): this
	useRequestMiddleware(middleware: RequestMiddleware | RequestMiddleware[]) {
		if (Array.isArray(middleware)) {
			this.requestMiddlewares.push(...middleware)
		} else {
			this.requestMiddlewares.push(middleware)
		}

		return this
	}

	// 添加响应中间件
	useResponseMiddleware(middleware: ResponseMiddleware): this
	useResponseMiddleware(middlewares: ResponseMiddleware[]): this
	useResponseMiddleware(middleware: ResponseMiddleware | ResponseMiddleware[]): this {
		if (Array.isArray(middleware)) {
			this.responseMiddlewares.push(...middleware)
		} else {
			this.responseMiddlewares.push(middleware)
		}

		return this
	}

	// 添加错误处理中间件
	useErrorMiddleware(middleware: ErrorHandlerMiddleware): this
	useErrorMiddleware(middlewares: ErrorHandlerMiddleware[]): this
	useErrorMiddleware(middleware: ErrorHandlerMiddleware | ErrorHandlerMiddleware[]): this {
		if (Array.isArray(middleware)) {
			this.errorMiddlewares.push(...middleware)
		} else {
			this.errorMiddlewares.push(middleware)
		}

		return this
	}

	// 请求中间件执行器
	async runRequestMiddlewares(config: any) {
		return useRequestMiddlewareRunner(config, this.requestMiddlewares)
	}

	// 响应中间件执行器
	async runResponseMiddlewares(response: any) {
		return useResponseMiddlewareRunner(response, this.responseMiddlewares)
	}

	// 错误处理中间件执行器
	async runErrorMiddlewares(error: any) {
		return useErrorMiddlewareRunner(error, this.errorMiddlewares)
	}
}
