<script setup lang="tsx">
import LayoutHorizontal from './LayoutHorizontal/index.vue'
import LayoutVertical from './LayoutVertical/index.vue'
import SettingDrawer from './settingDrawer/index.vue'

const globalSettingStore = useGlobalSettingStore()
</script>

<template>
	<div class="w-full h-full">
		<component :is="globalSettingStore.isVertical() ? LayoutVertical : LayoutHorizontal" />
		<setting-drawer></setting-drawer>
	</div>
</template>

<style lang="scss" scoped>
// @import 'index.scss';
</style>
