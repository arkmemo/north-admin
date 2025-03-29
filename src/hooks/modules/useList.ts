interface Params {
	[key: string]: any
}

interface UseListOptions<T, R = Params> {
	api: Function
	defaultParams?: R extends IPage ? Omit<R, keyof IPage> : R
	formatData?: (data: T[]) => T[]
	flag?: Ref<boolean>
}

/**
 * 一个用于管理分页列表的组合式函数，包含响应式状态管理、数据获取、参数重置和搜索功能。
 *
 * @template T - 列表中每个项的类型。
 * @template R - 用于获取数据的参数类型，默认为 `Params`。
 *
 * @param {UseListOptions<T, R>} options - 配置 `useList` 组合式函数的选项。
 * @param {Function} options.api - 用于获取列表数据的 API 函数。应返回一个包含 `list` 和 `total` 的 Promise 对象。
 * @param {R extends IPage ? Omit<R, keyof IPage> : R} [options.defaultParams] - API 请求的默认参数。如果 `R` 继承自 `IPage`，则排除 `IPage` 的键，会默认补充 `page` 和 `limit` 参数。
 * @param {(data: T[]) => T[]} [options.formatData] - 一个可选的函数，用于格式化获取到的列表数据。
 * @param {Ref<boolean>} [options.flag] - 一个可选的响应式标志，用于控制是否获取数据。如果为 `false`，则不会触发数据获取。
 *
 * @returns {{
 *   list: Ref<T[]>,
 *   total: Ref<number>,
 *   params: R,
 *   loading: Ref<boolean>,
 *   reset: () => void,
 *   search: (newParams?: Record<string, any>) => void
 * }} - 返回用于管理列表的响应式属性和方法。
 *
 * @property {Ref<T[]>} list - 列表项的响应式引用。
 * @property {Ref<number>} total - 列表项总数的响应式引用。
 * @property {R} params - 包含 API 请求参数的响应式对象。
 * @property {Ref<boolean>} loading - 表示数据是否正在加载的响应式引用。
 * @property {() => void} reset - 重置参数为默认值的方法。
 * @property {(newParams?: Record<string, any>) => void} search - 更新参数并触发新数据获取的方法。
 *
 * @example
 * ```typescript
 * const { list, total, params, loading, reset, search } = useList({
 *   api: fetchListApi,
 *   defaultParams: { id: 1 }, // 默认参数，会合并到 params 中
 *   formatData: (data) => data.map(item => ({ ...item, formatted: true })),
 *   flag: ref(true),
 * });
 *
 * // 使用新参数触发搜索
 * search({ keywords: 'example' });
 *
 * // 重置参数为默认值
 * reset();
 * ```
 */
export function useList<T, R>({ api, defaultParams, formatData, flag }: UseListOptions<T, R>) {
	const list = ref<T[]>([])
	const total = ref<number>(0)
	const params = reactive<Params>({
		page: 1,
		limit: 1,
		keywords: '',
		...defaultParams,
	})
	const loading = ref<boolean>(false)

	const fetchData = async () => {
		if (flag && !flag.value) return
		loading.value = true

		try {
			const { data } = await api(params)
			list.value = data.list
			total.value = data.total

			if (formatData) {
				list.value = formatData(data.list)
			}
		} catch (error) {
			console.error('Failed to fetch list:', error)
		} finally {
			loading.value = false
		}
	}

	const reset = () => {
		Object.keys(params).forEach((key) => {
			params[key] = defaultParams ? (defaultParams as Record<string, any>)[key] : undefined
		})
	}

	const search = (newParams = {}) => {
		Object.assign(params, newParams)
	}

	watch(params, fetchData, { deep: true })

	if (flag) {
		onMounted(fetchData)
	}

	return {
		list,
		total,
		params,
		loading,
		reset,
		search,
	}
}
