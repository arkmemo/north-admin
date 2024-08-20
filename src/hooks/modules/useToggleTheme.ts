import { useGlobalSettingStore } from '~/stores'
import { useTheme } from './useTheme'

const { isDark } = useTheme()
export const useToggleTheme = () => {
	const toggleTheme = (event: MouseEvent) => {
		const store = useGlobalSettingStore()

		const isAppearanceTransition =
			// @ts-ignore
			document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

		if (!isAppearanceTransition) {
			isDark.value = !isDark.value
			return
		}

		const x = event.clientX
		const y = event.clientY
		const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
		const transition = document.startViewTransition(async () => {
			isDark.value = !isDark.value
			await nextTick()
			store.state.isDark = isDark.value
		})
		transition.ready.then(() => {
			const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
			document.documentElement.animate(
				{
					clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
				},
				{
					duration: 400,
					easing: 'ease-out',
					pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)',
				},
			)
		})
	}

	return {
		isDark,
		toggleTheme,
	}
}
