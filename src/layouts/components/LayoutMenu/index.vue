<script setup lang="tsx">
import type { RouteMeta, RouteRecordRaw } from 'vue-router'

defineOptions({
	name: 'LayoutMenu',
})




type MenuList = Omit<RouteRecordRaw, "meta"> & {
	meta: RouteMeta
}  

defineProps<{ menuList: RouteRecordRaw[] }>()

const router = useRouter()
const handleClickMenu = (path: string) => {
	router.push(path)
}
</script>

<template>
	<template v-for="item in menuList" :key="item.path">
		<el-sub-menu v-if="item.children?.length" :index="item.path">
			<template #title>
				<Icon :icon="item.meta!.icon" text-18px />
				<span class="layout-menu__title">{{ item.meta!.title }}</span>
			</template>
			<layout-menu :menuList="item.children"></layout-menu>
		</el-sub-menu>
		<el-menu-item v-else :index="item.path" @click="handleClickMenu(item.path)">
			<Icon :icon="item.meta!.icon" text-18px />
			<template #title>
				<span class="layout-menu__title">{{ item.meta!.title }}</span>
			</template>
		</el-menu-item>
	</template>
</template>

<style scoped lang="scss">
.layout-menu__title {
	@apply: text-14px ml-6px;
}
</style>
