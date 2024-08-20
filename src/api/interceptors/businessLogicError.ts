import type { AxiosResponse } from 'axios'

// 定义自定义错误类型
export class BusinessLogicError extends Error {
	public response: AxiosResponse
	constructor(message: string, response: AxiosResponse) {
		super(message)
		this.name = 'BusinessLogicError'
		this.response = response
	}
}
