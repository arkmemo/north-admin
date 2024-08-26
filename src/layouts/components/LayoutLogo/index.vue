<script setup lang="tsx">
import { useGlobalSettingStore } from '~/stores'

const globalSettingStore = useGlobalSettingStore()
const collapsed = computed(() => globalSettingStore.state.collapsed)

// 通过collapsed的值来判断是否展示Logo的宽度
const layoutLogoStyle = computed(() => {
	return {
		display: collapsed.value ? 'none' : 'block',
	}
})
</script>

<template>
	<div class="layout-logo" :class="[globalSettingStore.isVertical() ? '' : 'mr-36px']">
		<img src="../../../assets/logo/logo.jpg" :width="38" alt="LOGO" rounded="1/8" cursor-pointer />
		<h1
			font="bold"
			text="16px"
			ml-10px
			cursor-pointer
			whitespace-nowrap
			transition-delay-100
			dark:text-white
			text-black
			:style="layoutLogoStyle"
		>
			North Admin
		</h1>
	</div>
</template>

<style scoped lang="scss">
.layout-logo {
	@apply: flex-center h-56px;
}
</style>
