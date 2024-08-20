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
@import '../../index.scss';
</style>
