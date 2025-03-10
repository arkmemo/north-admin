import { AxiosResponse } from 'axios'
import { ResponseMiddleware } from '~/api/types/middleware'
import { useErrorMiddlewareRunner } from '../../middlewareRunner'
import { globalErrorMiddleware } from '../error/globalMiddle'
import { BusinessLogicError } from '../../businessLogicError'

// 排除data
type AxiosResponseOmitData = Omit<AxiosResponse, 'data'>

export const parseDataMiddleware: ResponseMiddleware = async (response, next) => {
	const { data, status } = response as AxiosResponseOmitData & { data: IResponse<any> }

	if (status !== 200) {
		const runner = await useErrorMiddlewareRunner(new BusinessLogicError('请求失败', response), [
			globalErrorMiddleware,
		])

		return runner
	}

	if (data.code !== 200) {
		// 引入错误中间件进行处理
		// TODO: 业务逻辑错误处理， 待自定义
		const runner = await useErrorMiddlewareRunner(new BusinessLogicError(data.message, response), [
			globalErrorMiddleware,
		])
		return runner
	}

	return next(data as unknown as AxiosResponse)
}
