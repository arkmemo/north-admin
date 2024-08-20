<script setup lang="tsx">
import LayoutLogo from './components/LayoutLogo/index.vue'
import LayoutMenu from './components/LayoutMenu/index.vue'
import LayoutHeader from './components/LayoutHeader/index.vue'
import LayoutMain from './components/LayoutMain/index.vue'
import SettingDrawer from './settingDrawer/index.vue'
import { getDynamicRouter } from '~/router/routes/dynamicRouter.ts'
import { routesToMenu } from '~/router/helper/transformHelp'
import { useGlobalSettingStore } from '~/stores'

// const dynamicRouter = getDynamicRouter
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

			<el-scrollbar height="calc(100vh - 120px)" :class="[!collapsed ? 'pr-6px' : '']">
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

			<div px-10px>
				<div py-6px b-t="2px solid #ccc">
					<div
						h-40px
						flex-center
						text-white
						cursor-pointer
						py-10px
						transition-all
						rounded-10px
						hover:bg="#42408b"
						@click="globalSettingStore.state.openSettingPanel = true"
					>
						<Icon icon="fluent:launcher-settings-24-filled" text-18px />
						<span class="text-14px ml-6px whitespace-nowrap" v-if="!collapsed">设置</span>
					</div>
				</div>
			</div>
		</el-aside>
		<div class="py-6px pr-8px w-full">
			<el-container class="layout-container_sub">
				<layout-header></layout-header>
				<LayoutMain></LayoutMain>
				<el-footer>Footer</el-footer>
			</el-container>
		</div>

		<setting-drawer></setting-drawer>
	</el-container>
</template>

<style lang="scss" scoped>
@import 'index.scss';
</style>
