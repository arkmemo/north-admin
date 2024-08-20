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
					<div class="h-full w-26px bg-#9980FA rounded-6px"></div>
					<div h-full w-full>
						<div class="h-16px w-full bg-#9980FAcc rounded-6px"></div>
						<div class="h-[calc(100%-26px)] mt-8px w-full bg-#9980FA30 rounded-6px"></div>
					</div>
				</div>
			</el-card>
			<el-card
				class="layout-container p-8px cursor-pointer"
				shadow="hover"
				@click="handleClickChangeLayoutMode('horizontal')"
			>
				<div h-full gap-8px :class="[!store.isVertical() ? 'layout-active' : '']">
					<div class="w-full h-20px bg-#9980FA rounded-6px"></div>
					<div class="h-[calc(100%-30px)] mt-8px w-full bg-#9980FA30 rounded-6px"></div>
				</div>
			</el-card>
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
