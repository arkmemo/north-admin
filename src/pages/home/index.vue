<script setup lang="ts">
// import { fetchWeather } from '~/api/modules'

// fetchWeather({
// 	location: '116.41,39.92',
// }).then((res) => {
// 	console.log(res.data.feelsLike, 'res')
// })
const create = () => [
	{
		date: '2016-05-02',
		name: '王小虎',
		address: '上海市普陀区金沙江路 1518 弄',
	},
	{
		date: '2016-05-04',
		name: '王小虎',
		address: '上海市普陀区金沙江路 1517 弄',
	},
	{
		date: '2016-05-01',
		name: '王小虎',
		address: '上海市普陀区金沙江路 1519 弄',
	},
	{
		date: '2016-05-03',
		name: '王小虎',
		address: '上海市普陀区金沙江路 1516 弄',
	},
]
const data = ref([
	...create(),
	...create(),
	...create(),
	...create(),
	...create(),
	...create(),
	...create(),
	...create(),
])

const params = ref({
	page: 1,
	limit: 10,
})

const change = (page: number, limit: number) => {
	console.log(page, limit)
}

const handleClick = (row: any) => {
	console.log('click', row.name, row.address)
}
</script>

<template>
	<el-card>
		<h1>Home</h1>
		<p>Home page content</p>
		<table-page
			:data="data"
			:total="data.length"
			@change="change"
			v-model:page="params.page"
			v-model:limit="params.limit"
			:border="true"
		>
			<el-table-column prop="date" label="日期" width="180" />
			<el-table-column prop="name" label="姓名" width="180" />
			<el-table-column prop="address" label="地址" />
			<el-table-column fixed="right" label="Operations" min-width="120">
				<template #default="{ row }">
					<el-button link type="primary" size="small" @click="handleClick(row)"> Detail </el-button>
					<el-button link type="primary" size="small">Edit</el-button>
				</template>
			</el-table-column>
		</table-page>
	</el-card>
</template>

<style scoped lang="scss"></style>
