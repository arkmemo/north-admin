<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
	<el-config-provider :locale="zhCn">
		<Suspense>
			<!-- 具有深层异步依赖的组件 -->
			<router-view></router-view>

			<!-- 在 #fallback 插槽中显示 “正在加载中” -->
			<template #fallback> Loading... </template>
		</Suspense>
	</el-config-provider>
</template>

<style scoped lang="scss"></style>
