<script setup lang="ts"></script>

<template>
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
</template>

<style lang="scss" scoped></style>
