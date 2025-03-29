<script setup lang="tsx">
const store = useGlobalSettingStore()

const handleClickChangeLayoutMode = (mode: string) => {
	store.state.layoutMode = mode
}
</script>

<template>
	<el-drawer class="custom-drawer" v-model="store.state.openSettingPanel" title="布局设置" size="290px">
		<el-divider class="divider" content-position="center">
			<div flex-center>
				<Icon icon="fluent:layout-column-two-split-right-20-filled" text-20px></Icon>
				<span ml-6px>布局样式</span>
			</div>
		</el-divider>

		<div grid="~ cols-2" gap-20px shadow="hover">
			<el-card class="layout-container p-8px cursor-pointer" @click="handleClickChangeLayoutMode('vertical')">
				<div h-full flex-between gap-8px :class="[store.isVertical() ? 'layout-active' : '']">
					<div class="h-full w-26px bg-[var(--north-bg-color)] rounded-6px"></div>
					<div h-full w-full>
						<div class="h-16px w-full bg-[var(--north-bg-color)] opacity-80 rounded-6px"></div>
						<div
							class="h-[calc(100%-26px)] mt-8px w-full bg-[var(--north-bg-color)] opacity-30 rounded-6px"
						></div>
					</div>
				</div>
			</el-card>
			<el-card
				class="layout-container p-8px cursor-pointer"
				shadow="hover"
				@click="handleClickChangeLayoutMode('horizontal')"
			>
				<div h-full gap-8px :class="[!store.isVertical() ? 'layout-active' : '']">
					<div class="w-full h-20px bg-[var(--north-bg-color)] rounded-6px"></div>
					<div
						class="h-[calc(100%-30px)] mt-8px w-full bg-[var(--north-bg-color)] opacity-30 rounded-6px"
					></div>
				</div>
			</el-card>
		</div>

		<div class="pt-20px space-y-10px">
			<el-divider class="divider" content-position="center">
				<div flex-center>
					<Icon icon="fluent:layout-column-two-split-right-20-filled" text-20px></Icon>
					<span ml-6px>主题样式</span>
				</div>
			</el-divider>
			<div flex-between>
				<div class="text-14px w-80px text-right">主题颜色</div>
				<el-color-picker v-model="store.state.sideBarColor" />
			</div>

			<div class="flex-between">
				<div class="text-14px w-80px text-right">深色菜单</div>
				<el-switch v-model="store.state.isDarkMenu" />
			</div>
		</div>

		<div class="pt-20px space-y-10px">
			<el-divider class="divider" content-position="center">
				<div flex-center>
					<Icon icon="fluent:layout-column-two-split-right-20-filled" text-20px></Icon>
					<span ml-6px>布局样式</span>
				</div>
			</el-divider>

			<div class="flex-between">
				<div class="text-14px w-80px text-right">显示面包屑</div>
				<el-switch v-model="store.state.hasBreadcrumb" />
			</div>

			<!-- hasTabs -->
			<div class="flex-between">
				<div class="text-14px w-80px text-right">显示标签页</div>
				<el-switch v-model="store.state.hasTabs" />
			</div>

			<!-- hasFooter -->
			<div class="flex-between">
				<div class="text-14px w-80px text-right">显示页脚</div>
				<el-switch v-model="store.state.hasFooter" />
			</div>
		</div>
	</el-drawer>
</template>

<style lang="scss" scoped>
:deep(.el-card__body) {
	padding: 0;
	height: 100%;
}

.layout-container {
	width: 100%;
	height: 100px;
	position: relative;
}

.layout-sider {
	width: 100%;
	height: 100%;
	background-color: #f0f2f5;
}

.layout-active {
	// 右下角小圆圈勾
	&::after {
		content: '√';
		position: absolute;
		right: 0;
		bottom: 0;
		width: 20px;
		height: 20px;
		background-color: #409eff;
		border-radius: 50%;
		@apply: flex-center;
	}

	// 右下角小圆圈勾的图标
}
</style>
