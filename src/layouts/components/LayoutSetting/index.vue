<script setup lang="tsx">
const globalSettingStore = useGlobalSettingStore()
</script>

<template>
	<div>
		<div cursor-pointer ml-10px @click="globalSettingStore.state.openSettingPanel = true">
			<Icon icon="fluent:launcher-settings-24-filled" text-26px />
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
