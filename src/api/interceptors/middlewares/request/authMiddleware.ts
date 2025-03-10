import { RequestMiddleware } from '~/api/types/middleware'

export const authMiddleware: RequestMiddleware = async (config, next) => {
	console.log('auth-> Before request:', config)

	config.headers['Content-Type'] = 'application/json'
	config.headers['Authorization'] = JSON.parse(localStorage.getItem('useUserStore') || '')?.token
	const response = await next()
	console.log('auth-> After request:', response)
	return response
}
