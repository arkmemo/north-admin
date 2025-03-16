<script setup lang="ts">
import Tabs from '../../tabs/index.vue'
</script>

<template>
	<Tabs></Tabs>
	<el-main class="layout-container_sub-main">
		<el-scrollbar>
			<router-view v-slot="{ Component }">
				<keep-alive>
					<component :is="Component" v-if="$route.meta.isKeepAlive" :key="$route.name" />
				</keep-alive>
				<component :is="Component" v-if="!$route.meta.isKeepAlive" :key="$route.name" />
			</router-view>
		</el-scrollbar>
	</el-main>
</template>

<style lang="scss" scoped>
.layout-container_sub {
	@apply: w-full rounded-10px;
	--at-apply: bg-#F9F8FD dark-bg-#141414;

	&-main {
		height: calc(100vh - 153px);
	}
}
</style>
