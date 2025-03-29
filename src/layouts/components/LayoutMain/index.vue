<script setup lang="ts"></script>

<template>
	<el-scrollbar :height="'calc(100vh - 130px)'">
		<router-view v-slot="{ Component }">
			<keep-alive>
				<component :is="Component" v-if="$route.meta.isKeepAlive" :key="$route.name" />
			</keep-alive>
			<component :is="Component" v-if="!$route.meta.isKeepAlive" :key="$route.name" />
		</router-view>
	</el-scrollbar>
</template>

<style lang="scss" scoped></style>
