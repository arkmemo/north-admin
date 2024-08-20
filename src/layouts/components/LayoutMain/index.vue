<script setup lang="ts">
import Tabs from '../../tabs/index.vue'
</script>

<template>
	<Tabs></Tabs>
	<el-main class="layout-container_sub-main">
		<el-card>
			<router-view></router-view>
		</el-card>
	</el-main>
</template>

<style lang="scss" scoped>
.layout-container_sub {
	@apply: w-full rounded-10px;
	--at-apply: bg-#F9F8FD dark-bg-#141414;

	&-main {
		height: calc(100vh - 158px);
	}
}
</style>
