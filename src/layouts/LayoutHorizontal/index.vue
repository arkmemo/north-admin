<script setup lang="tsx">
import LayoutLogo from '../components/LayoutLogo/index.vue'
import LayoutMenu from '../components/LayoutMenu/index.vue'
import LayoutUser from '../components/LayoutUser/index.vue'
import LayoutTheme from '../components/LayoutTheme/index.vue'
import LayoutMain from '../components/LayoutMain/index.vue'
import LayoutSetting from '../components/LayoutSetting/index.vue'

import { getDynamicRouter } from '~/router/routes/dynamicRouter.ts'
import { routesToMenu } from '~/router/helper/transformHelp'

const route = useRoute()
const activeRoute = ref(route.path)
const menu = routesToMenu(getDynamicRouter)
const globalSettingStore = useGlobalSettingStore()
</script>

<template>
	<el-container>
		<el-header class="layout-header">
			<LayoutLogo></LayoutLogo>
			<div h="70%" overflow-hidden>
				<el-menu :router="false" :default-active="activeRoute" mode="horizontal">
					<template v-for="item in menu" :key="item.path">
						<el-sub-menu v-if="item.children?.length" :key="item.path" :index="item.path">
							<template #title>
								<Icon :icon="item.meta.icon" />
								<span ml-8px>{{ item.meta.title }}</span>
							</template>
							<layout-menu :menu-list="item.children"></layout-menu>
						</el-sub-menu>
						<el-menu-item v-else :key="item.path" :index="item.path">
							<Icon :icon="item.meta.icon" />
							<template #title>
								<span ml-8px>{{ item.meta.title }}</span>
							</template>
						</el-menu-item>
					</template>
				</el-menu>
			</div>

			<div class="flex-center">
				<LayoutUser />
				<LayoutTheme />
				<LayoutSetting />
			</div>
		</el-header>
		<LayoutMain />
		<el-footer>Footer</el-footer>
	</el-container>
</template>

<style lang="scss" scoped>
.layout-header {
	display: grid;
	grid-template-columns: auto 1fr auto;
	align-items: center;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

:deep(.el-menu--horizontal) {
	height: 100%;
	//
	.el-menu-item,
	.el-sub-menu {
		margin: 0 4px;
	}

	// .el-menu-item {
	// 	&.is-active {
	// 		background-color: var(--north-bg-color) !important;
	// 		color: #fff !important;
	// 	}

	// 	&:hover {
	// 		color: #fff !important;
	// 		background-color: var(--north-bg-color) !important;
	// 	}
	// }

	// .el-sub-menu {
	// 	.el-sub-menu__title {
	// 		border-radius: 6px;
	// 		background: transparent;
	// 		transition:
	// 			background-color var(--el-transition-duration),
	// 			color 0.2s;

	// 		&:hover {
	// 			color: #fff !important;
	// 		}
	// 	}

	// 	&:hover {
	// 		background-color: var(--north-bg-color) !important;
	// 	}
	// }
}
</style>
