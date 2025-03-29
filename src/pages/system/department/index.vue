<script setup lang="ts">
import { fetchDepartmentTree, fetchEmployeeList } from '~/api/modules'
import { useList } from '~/hooks'

const defaultParams: { departmentId: number | undefined; username: string; phone: string } = {
	departmentId: undefined,
	username: '',
	phone: '',
}

const fetchFlag = ref(false)
const { params, loading, list, search, total } = useList<IEmployeeEntity, IEmployeeListRequest>({
	api: fetchEmployeeList,
	defaultParams,
	flag: fetchFlag,
})

const treeData = ref<EntityDepartmentTree[]>([])
const defaultExpandedKeys = ref<number[]>([])
const currentNodeKey = ref<string | number>('')
const getTreeData = async () => {
	const { data } = await fetchDepartmentTree()
	treeData.value = data
	data.forEach((item) => {
		if (item.children) {
			defaultExpandedKeys.value.push(item.id)
			currentNodeKey.value = item.id
		}
	})

	if (data.length) {
		params.departmentId = data[0].id
	}
}

const handleClickTreeNodeChangeEmployee = (data: EntityDepartmentTree) => {
	params.departmentId = data.id
	search()
}

await getTreeData()
fetchFlag.value = true
search()
</script>

<template>
	<el-card shadow="never" :body-style="{ padding: '24px' }" mt-16px>
		<template #header>
			<el-button type="primary">添加部门</el-button>
		</template>

		<div class="flex">
			<div class="mr-16px w-14%">
				<el-tree
					style="max-width: 100%"
					:data="treeData"
					:default-expanded-keys="defaultExpandedKeys"
					:current-node-key="currentNodeKey"
					:props="{
						children: 'children',
						label: 'name',
					}"
					node-key="id"
					:highlight-current="true"
					:expand-on-click-node="false"
					@node-click="handleClickTreeNodeChangeEmployee"
				/>
			</div>

			<table-page
				class-name="w-90%"
				:page="params.page"
				:limit="params.limit"
				@change="search"
				:data="list"
				:loading="loading"
				:total="total"
				:border="true"
			>
				<el-table-column min-width="150" prop="username" label="姓名" />
				<el-table-column prop="phone" label="手机号" />
				<el-table-column label="操作">
					<template #default="{}">
						<el-button type="primary" size="small">编辑</el-button>
						<el-button type="danger" size="small">删除</el-button>
					</template>
				</el-table-column>
			</table-page>
		</div>
	</el-card>
</template>

<style lang="scss" scoped></style>
