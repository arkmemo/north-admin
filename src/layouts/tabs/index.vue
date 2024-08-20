<script setup lang="tsx">
import { TabPaneName } from 'element-plus'
import { useTabsStore } from '~/stores'

const route = useRoute()
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
</script>

<template>
	<el-tabs v-model="currentTab" :closable="tabsList.length > 1" px-20px @tab-remove="handleTabRemove">
		<el-tab-pane v-for="tab in tabsList" :key="tab.path" :label="tab.title" :name="tab.path">
			<template #label>
				<span flex-center>
					<Icon :icon="tab.icon"></Icon>
					<router-link :to="tab.path">
						<span ml-6px>{{ tab.title }}</span>
					</router-link>
				</span>
			</template>
		</el-tab-pane>
	</el-tabs>
</template>

<style lang="scss" scoped>
.el-tabs {
	--el-tabs-header-height: 36px;
}

:deep(.el-tabs__item.is-active) {
	color: #9980fa;
}
:deep(.el-tabs__item:hover) {
	color: #9980fa;
}

:deep(.el-tabs__active-bar) {
	background-color: #9980fa;
}
</style>
