<script setup lang="tsx">
import LayoutUser from '../LayoutUser/index.vue'
import LayoutTheme from '../LayoutTheme/index.vue'
import { useGlobalSettingStore } from '~/stores'

const globalSettingStore = useGlobalSettingStore()
const collapsed = computed(() => globalSettingStore.state.collapsed)
const handleChangeMenu = () => {
	globalSettingStore.state.collapsed = !collapsed.value
}
</script>

<template>
	<el-header class="layout-header">
		<div @click="handleChangeMenu">
			<Icon icon="ep:expand" text-22px v-if="collapsed" />
			<Icon icon="ep:fold" text-22px v-else />
		</div>
		<div flex-center>
			<LayoutUser />
			<LayoutTheme />
		</div>
	</el-header>
</template>

<style lang="scss" scoped>
.layout-header {
	@apply: flex-between h-50px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.12);
}
</style>
