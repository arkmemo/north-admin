<script setup lang="tsx">
const globalSettingStore = useGlobalSettingStore()
const collapsed = computed(() => globalSettingStore.state.collapsed)
const layoutMode = computed(() => globalSettingStore.isVertical())
</script>

<template>
	<div>
		<div
			v-if="layoutMode"
			h-40px
			flex-center
			text-white
			cursor-pointer
			py-10px
			transition-all
			rounded-10px
			hover:bg="#42408b"
			@click="globalSettingStore.state.openSettingPanel = true"
		>
			<Icon icon="fluent:launcher-settings-24-filled" text-18px />
			<span class="text-14px ml-6px whitespace-nowrap" v-if="!collapsed">设置</span>
		</div>
		
		<div v-else cursor-pointer ml-10px @click="globalSettingStore.state.openSettingPanel = true">
			<Icon icon="fluent:launcher-settings-24-filled" text-26px />
		</div>
	</div>
</template>


<style lang="scss" scoped></style>