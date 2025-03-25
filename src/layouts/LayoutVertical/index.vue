<script setup lang="ts">
import LayoutLogo from '../components/LayoutLogo/index.vue'
import LayoutMenu from '../components/LayoutMenu/index.vue'
import LayoutHeader from '../components/LayoutHeader/index.vue'
import LayoutMain from '../components/LayoutMain/index.vue'
import LayoutSetting from '../components/LayoutSetting/index.vue'
import Tabs from '../tabs/index.vue'

import { getDynamicRouter } from '~/router/routes/dynamicRouter.ts'
import { routesToMenu } from '~/router/helper/transformHelp'
const menu = routesToMenu(getDynamicRouter)
const route = useRoute()
const activeRoute = ref(route.path)

const globalSettingStore = useGlobalSettingStore()
const collapsed = computed(() => globalSettingStore.state.collapsed)

const layoutAsideBarStyle = computed(() => {
	return {
		width: collapsed.value ? '64px' : '220px',
	}
})
</script>

<template>
	<el-container class="layout-container">
		<el-aside class="layout-aside" :style="layoutAsideBarStyle">
			<LayoutLogo></LayoutLogo>

			<el-scrollbar style="height: calc(100vh - 66px)">
				<el-menu
					:router="false"
					:default-active="activeRoute"
					:unique-opened="true"
					:collapse-transition="false"
					:collapse="collapsed"
				>
					<layout-menu :menu-list="menu"></layout-menu>
				</el-menu>
			</el-scrollbar>
		</el-aside>
		<el-container class="layout-container_sub">
			<layout-header w-full></layout-header>
			<Tabs></Tabs>

			<el-main class="layout-container_sub-main">
				<LayoutMain></LayoutMain>
			</el-main>
			<el-footer class="layout-footer"> 版权所有©2025 northal.online 鄂ICP备2024068459号-2 </el-footer>
		</el-container>
	</el-container>
</template>

<style lang="scss" scoped>
.layout-container {
	height: 100%;
}

.layout-aside {
	height: 100%;
	transition: all 0.3s;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
	background-color: var(--background-color);
}

.layout-container_sub {
	flex-direction: column;
	flex: 1;
	width: 100%;
}

.layout-footer {
	--el-footer-height: 40px;
	text-align: center;
	line-height: var(--el-footer-height);
	font-size: 12px;
	background-color: var(--background-color);
}
</style>
