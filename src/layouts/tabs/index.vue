<script setup lang="tsx">
import type { TabPaneName, TabsPaneContext } from 'element-plus'

const route = useRoute()
const router = useRouter()
const currentTab = ref(route.path)
const store = useTabsStore()

const tabsList = computed(() => store.tabsList)

watch(
	() => route.fullPath,
	() => {
		currentTab.value = route.fullPath
		store.addTab({
			title: route.meta.title,
			icon: route.meta.icon,
			path: route.fullPath,
			name: route.name,
			isKeepAlive: false,
		})
	},
	{ immediate: true },
)

const handleTabRemove = (path: TabPaneName) => {
	store.removeTab(String(path))
}

const handleTabClick = (tab: TabsPaneContext) => {
	router.push(String(tab.paneName))
}
</script>

<template>
	<div class="tabs-container">
		<el-tabs
			v-model="currentTab"
			:closable="tabsList.length > 1"
			@tab-remove="handleTabRemove"
			@tab-click="handleTabClick"
			type="card"
			tab-position="top"
		>
			<el-tab-pane v-for="tab in tabsList" :key="tab.path" :label="tab.title" :name="tab.path">
				<template #label>
					<span class="tab-label" flex-center>
						<Icon :icon="tab.icon" class="tab-icon"></Icon>
						<span>{{ tab.title }}</span>
					</span>
				</template>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<style lang="scss" scoped>
.tabs-container {
	background-color: var(--background-color);

	.el-tabs {
		--el-tabs-header-height: 40px;
		--el-tabs-card-height: 36px;

		.el-tabs__item {
			font-size: 14px;
			color: var(--el-text-color-secondary);
			padding: 8px 16px;
			// border-radius: 4px;
			transition: all 0.3s;

			&:hover {
				background-color: var(--el-color-primary-light-8);
				color: var(--el-color-primary);
			}

			&.is-active {
				background-color: var(--el-color-primary-light-7);
				color: var(--el-color-primary-dark-2);
				font-weight: bold;
			}
		}
	}
}

.tab-label {
	display: flex;
	align-items: center;
	gap: 6px;
}

.tab-icon {
	font-size: 16px;
	color: var(--el-color-primary);
}
</style>
