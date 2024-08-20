<script setup lang="ts"></script>

<template>
	<el-config-provider>
		<Suspense>
			<!-- 具有深层异步依赖的组件 -->
			123
			<!-- <router-view></router-view> -->

			<!-- 在 #fallback 插槽中显示 “正在加载中” -->
			<template #fallback> Loading... </template>
		</Suspense>
	</el-config-provider>
</template>

<style scoped lang="scss"></style>
