interface Params {
	[key: string]: any
}

interface UseListOptions<T, R = Params> {
	api: Function
	defaultParams?: R extends IPage ? Omit<R, keyof IPage> : R
	formatData?: (data: T[]) => T[]
}

export function useList<T, R>({ api, defaultParams, formatData }: UseListOptions<T, R>) {
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

	onMounted(fetchData)

	return {
		list,
		total,
		params,
		loading,
		reset,
		search,
	}
}
