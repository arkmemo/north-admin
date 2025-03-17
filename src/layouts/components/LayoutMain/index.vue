<script setup lang="ts">
import Tabs from '../../tabs/index.vue'
</script>

<template>
	<div>
		<Tabs></Tabs>
		<el-scrollbar :height="'calc(100vh - 194px)'">
			<router-view v-slot="{ Component }">
				<keep-alive>
					<component :is="Component" v-if="$route.meta.isKeepAlive" :key="$route.name" />
				</keep-alive>
				<component :is="Component" v-if="!$route.meta.isKeepAlive" :key="$route.name" />
			</router-view>
		</el-scrollbar>
	</div>
</template>

<style lang="scss" scoped>
.layout-container_sub {
	@apply: w-full rounded-10px;
	--at-apply: bg-#F9F8FD dark-bg-#141414;

	&-main {
		height: calc(100vh - 188px);
		padding: 0;
	}
}
</style>
