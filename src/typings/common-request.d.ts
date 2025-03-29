/**
 * @description 通用列表返回类型
 * @param list 列表数据
 * @param total 总数
 * @author North
 * @example
 * const list = ref<IList<ITable>>({ list: [], total: 0 })
 * */
interface IList<T> {
	list: T[]
	total: number
}

/**
 * @description 通用分页请求参数类型
 * @param page 页码
 * @param limit 每页数量
 * @author North
 * @example
 * const params = ref<IPage>({ page: 1, limit: 10 })
 * */
interface IPage {
	page: number
	limit: number
	keywords?: string
}
interface TableParams<T> {
	page: number
	limit: number
	total: number
	loading: boolean
	data: T[]
}
