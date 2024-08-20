<script setup lang="tsx">
import { useGlobalSettingStore } from '~/stores'

const store = useGlobalSettingStore()
</script>

<template>
	<el-drawer class="custom-drawer" v-model="store.state.openSettingPanel" title="布局设置" size="290px">
		<el-divider class="divider" content-position="center">
			<div flex-center>
				<Icon icon="fluent:layout-column-two-split-right-20-filled" text-20px></Icon>
				<span ml-6px>布局样式</span>
			</div>
		</el-divider>
	</el-drawer>
</template>

<style lang="scss" scoped>
.custom-drawer {
}
</style>
