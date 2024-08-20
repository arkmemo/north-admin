import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { BaseMiddleware } from '../interceptors/middlewares/base'

export class HttpClient extends BaseMiddleware {
	/**
	 * @description Axios 实例
	 * @private
	 */
	private instance!: AxiosInstance

	/**
	 * @description Axios配置
	 * @private
	 */
	private readonly options!: AxiosRequestConfig

	// private _requestMiddlewares: Middleware[] = []
	// private _responseMiddlewares: Middleware[] = []

	// public set requestMiddlewares(value: Middleware[]) {
	// 	this._requestMiddlewares = value
	// }

	// public set responseMiddlewares(value: Middleware[]) {
	// 	this._responseMiddlewares = value
	// }

	constructor(options: AxiosRequestConfig) {
		super()
		this.options = options
		this.instance = axios.create(options)
		this.setupInterceptors()
	}

	private setupInterceptors() {
		this.instance.interceptors.request.use(
			async (config: InternalAxiosRequestConfig) => {
				const runner = await super.runRequestMiddlewares(config)
				return runner
			},
			async (error) => {
				// 对请求错误做些什么
				await super.runErrorMiddlewares(error)
				return Promise.reject(error)
			},
		)

		this.instance.interceptors.response.use(
			async (response) => {
				// console.log('Response:', response)
				// const { data, status } = response

				return await super.runResponseMiddlewares(response)

				// 为200说明axios请求成功
				// if (status === 200) {
				// 	// 判断业务逻辑
				// 	if (data.code === 200) {
				// 		// 业务逻辑成功
				// 		return data
				// 	} else {
				// 		// 业务逻辑失败
				// 		return Promise.reject(data)
				// 	}
				// }

				// return data
			},
			async (error) => {
				// 超出 2xx 范围的状态码都会触发该函数。
				// 对响应错误做点什么
				await super.runErrorMiddlewares(error)
				return Promise.reject(error)
			},
		)
	}

	public request = <T = any>(config: AxiosRequestConfig, options: AxiosRequestConfig): Promise<IResponse<T>> => {
		const requestOptions = { ...this.options, ...options, ...config }
		return this.instance.request<any, IResponse<T>>(requestOptions)
	}

	public get = <T = any>(url: string, params: any = {}, config: AxiosRequestConfig = {}): Promise<IResponse<T>> => {
		return this.request<T>({ url, params, method: 'GET' }, config)
	}

	public post = <T = any>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<IResponse<T>> => {
		return this.request<T>({ url, data, method: 'POST' }, config)
	}

	public put = <T = any>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<IResponse<T>> => {
		return this.request<T>({ url, data, method: 'PUT' }, config)
	}

	public delete = <T = any>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<IResponse<T>> => {
		return this.request<T>({ url, data, method: 'DELETE' }, config)
	}
}
