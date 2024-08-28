<script setup lang="tsx" generic="T = any">
interface Props {
	data: T[]
	total: number
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
	change: [number, number]
}>()
const props = withDefaults(defineProps<Props>(), {
	data: () => [],
	total: 0,
})

watchEffect(() => {
	emits('change', page.value, limit.value)
})
</script>

<template>
	<div>
		<el-table :data="data" v-bind="attrs" height="340">
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
