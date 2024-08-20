import { HttpClient } from './request'
import {
	authMiddleware,
	globalErrorMiddleware,
	notFoundMiddleware,
	parseDataMiddleware,
	progressMiddleware,
} from '../interceptors'

const createHttpClient = () => {
	const httpClient = new HttpClient({
		baseURL: 'http://123.60.72.205:7777/North/api',
		timeout: 10000,
	})

	// 注册中间件
	// 例如，假设有三个请求中间件：A, B, C。执行顺序是：
	// A -> B -> C -> C (后置逻辑) -> B (后置逻辑) -> A (后置逻辑)
	httpClient
		.useRequestMiddleware([progressMiddleware, authMiddleware])
		.useResponseMiddleware([parseDataMiddleware])
		.useErrorMiddleware([globalErrorMiddleware, notFoundMiddleware])

	return httpClient
}

export const httpClient = createHttpClient()
export const get = httpClient.get
export const post = httpClient.post
export const put = httpClient.put
export const request = httpClient.request
export const _delete = httpClient.delete
