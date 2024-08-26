<script setup lang="ts">
import LayoutLogo from '../components/LayoutLogo/index.vue'
import LayoutMenu from '../components/LayoutMenu/index.vue'
import LayoutHeader from '../components/LayoutHeader/index.vue'
import LayoutMain from '../components/LayoutMain/index.vue'
import LayoutSetting from '../components/LayoutSetting/index.vue'
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
					<LayoutSetting></LayoutSetting>
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
	</el-container>
</template>

<style lang="scss" scoped>
.layout-container {
	@apply: bg-[--north-bg-color];
}

.layout-aside {
	@apply: bg-[--north-bg-color] h-full transition-all;
}

.layout-container_sub {
	@apply: w-full rounded-10px;
	--at-apply: bg-#f9f8fd dark-bg-#141414;

	&-main {
		height: calc(100vh - 158px);
	}
}

:deep(.el-menu) {
	.el-menu-item,
	.el-sub-menu__title {
		//color: #a9a9a9;
		//border-radius: 6px;
		//user-select: none;
		position: relative;

		&.is-active {
			background-color: #2e3033;
			color: #fff;
			// 放一个小竖条在最右边
			&::after {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 8px;
				height: 70%;
				border-radius: 0 10px 10px 0;
				background-color: #e0defb;
			}
		}

		&:hover {
			background-color: #2e3033;
			color: #fff;
		}
	}
}

.el-menu--collapse .el-sub-menu.is-active .el-sub-menu__title {
	//background-color: #333080;
	color: #fff !important;
}

.el-menu--popup-container {
	.el-menu--popup {
		//background-color: #9980fa !important;
		padding: 10px;
	}
}
</style>
