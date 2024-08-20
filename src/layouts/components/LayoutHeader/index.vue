<script setup lang="tsx">
import { useToggleTheme } from '~/hooks/modules/useToggleTheme'
import { useGlobalSettingStore } from '~/stores'

const globalSettingStore = useGlobalSettingStore()
const collapsed = computed(() => globalSettingStore.state.collapsed)
const handleChangeMenu = () => {
	globalSettingStore.state.collapsed = !collapsed.value
}

const { toggleTheme, isDark } = useToggleTheme()
</script>

<template>
	<el-header class="layout-header">
		<div @click="handleChangeMenu">
			<Icon icon="ep:expand" text-22px v-if="collapsed" />
			<Icon icon="ep:fold" text-22px v-else />
		</div>
		<div flex-center>
			<el-dropdown trigger="hover">
				<img src="../../../assets/logo/logo.jpg" width="32" alt="avatar" rounded-32px outline-none />
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item>
							<Icon icon="fluent:person-edit-24-filled" mr-6px />
							个人中心
						</el-dropdown-item>
						<el-dropdown-item divided>
							<Icon icon="fluent:sign-out-20-filled" mr-6px />
							退出登录
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>

			<div cursor="pointer" ml-10px @click="toggleTheme">
				<Icon icon="fluent:weather-moon-20-regular" v-if="!isDark" text-26px />
				<Icon icon="fluent:dark-theme-20-filled" v-else text-26px />
			</div>
		</div>
	</el-header>
</template>

<style lang="scss" scoped>
.layout-header {
	@apply: flex-between h-50px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.12);
}
</style>
