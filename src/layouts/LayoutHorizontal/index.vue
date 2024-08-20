<script setup lang="tsx">
import LayoutLogo from '../components/LayoutLogo/index.vue'
import LayoutMenu from '../components/LayoutMenu/index.vue'
import LayoutUser from '../components/LayoutUser/index.vue'
import LayoutTheme from '../components/LayoutTheme/index.vue'
import LayoutMain from '../components/LayoutMain/index.vue'

import { getDynamicRouter } from '~/router/routes/dynamicRouter.ts'
import { routesToMenu } from '~/router/helper/transformHelp'

const route = useRoute()
const activeRoute = ref(route.path)
const menu = routesToMenu(getDynamicRouter)
const globalSettingStore = useGlobalSettingStore()
const collapsed = computed(() => globalSettingStore.state.collapsed)
</script>

<template>
	<el-container>
		<el-header class="layout-header">
			<LayoutLogo></LayoutLogo>
			<el-menu
				:router="false"
				:default-active="activeRoute"
				:unique-opened="true"
				:collapse-transition="false"
				:collapse="collapsed"
				mode="horizontal"
			>
				<layout-menu :menu-list="menu"></layout-menu>
			</el-menu>

			<div class="flex-center">
				<LayoutUser />
				<LayoutTheme />
			</div>
		</el-header>
		<LayoutMain />
		<el-footer>Footer</el-footer>
	</el-container>
</template>

<style lang="scss" scoped>
.layout-header {
	@apply: flex-between;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.12);
}
</style>
