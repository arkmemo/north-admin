export const useTheme = () => {
	const isDark = ref(false)

	watchEffect(() => {
		if (isDark.value) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	})

	// 监听系统主题切换
	const getTheme = () => {
		// 如果有缓存，则为缓存内容
		const systemTheme =
			JSON.parse(localStorage.getItem('globalSettingStore')!)?.state?.isDark ??
			window.matchMedia('(prefers-color-scheme: dark)').matches

		isDark.value = systemTheme
	}
	getTheme()

	return {
		isDark,
		getTheme,
	}
}
