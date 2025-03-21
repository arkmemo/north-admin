<script setup lang="ts">
import { fetchDepartmentTree, fetchEmployeeList } from '~/api/modules'
import { useList } from '~/hooks'

const treeData = ref<EntityDepartmentTree[]>([])
const defaultExpandedKeys = ref<number[]>([])
const getTreeData = async () => {
	const { data } = await fetchDepartmentTree()
	treeData.value = data
	data.forEach((item) => {
		if (item.children) {
			defaultExpandedKeys.value.push(item.id)
		}
	})
}

const initParams = () => ({
	departmentId: 0,
	username: '',
	phone: '',
})

const { params, loading, list, search, total } = useList<IEmployeeEntity, IEmployeeListRequest>({
	api: fetchEmployeeList,
	defaultParams: initParams(),
})

const handleClickTreeNodeChangeEmployee = (data: EntityDepartmentTree) => {
	params.departmentId = data.id
	search()
}

await getTreeData()
</script>

<template>
	<el-card shadow="never" :body-style="{ padding: '24px' }" mt-16px>
		<template #header>
			<el-button type="primary">添加部门</el-button>
		</template>

		<div class="flex">
			<div class="w-200px mr-16px">
				<el-tree
					style="max-width: 300px"
					:data="treeData"
					:default-expanded-keys="defaultExpandedKeys"
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
				class-name="flex-1"
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
