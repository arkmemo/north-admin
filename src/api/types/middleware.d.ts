import type { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

export interface RequestMiddleware {
	(
		config: InternalAxiosRequestConfig,
		next: () => Promise<InternalAxiosRequestConfig<any>>,
	): Promise<InternalAxiosRequestConfig<any>>
}

export interface ErrorHandlerMiddleware {
	(error: AxiosError, next: () => Promise<any>): Promise<any>
}

export interface ResponseMiddleware {
	(
		response: AxiosResponse,
		next: (modifiedResponse?: AxiosResponse) => Promise<AxiosResponse>,
	): Promise<AxiosResponse>
}
