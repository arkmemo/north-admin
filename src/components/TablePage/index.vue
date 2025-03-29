<script setup lang="tsx" generic="T = any">
interface Props {
	data: T[]
	total: number
	loading: boolean
	className?: string
}

const page = defineModel('page', {
	type: Number,
	default: 1,
})
const limit = defineModel('limit', {
	type: Number,
	default: 10,
})
const attrs = useAttrs()
const emits = defineEmits<{
	change: [{ page: number; limit: number }]
}>()
withDefaults(defineProps<Props>(), {
	data: () => [],
	total: 0,
})

watchEffect(() => {
	emits('change', {
		page: page.value,
		limit: limit.value,
	})
})
</script>

<template>
	<div :class="className">
		<el-table :data="data" v-loading="loading" v-bind="attrs">
			<slot />
		</el-table>
		<el-pagination
			mt-10px
			flex-end
			v-model:current-page="page"
			v-model:page-size="limit"
			background
			:page-sizes="[10, 20, 50, 100]"
			:total="total"
			layout="total, sizes, prev, pager, next, jumper"
		/>
	</div>
</template>

<style lang="scss" scoped></style>
