<template>
	<div class="page-wrapper">
		<div class="page-wrapper_body">
			<el-card shadow="never" :body-style="{ padding: '24px' }" mt-16px>
				<template #header>
					<el-button type="primary" @click="handleCreate">
						<template #icon>
							<i class="material-symbols:add-2-rounded"></i>
						</template>
						新增角色
					</el-button>
				</template>
				<el-table :data="table.data" border row-key="id" v-loading="table.loading">
					<el-table-column
						v-for="col in columns"
						:show-overflow-tooltip="true"
						:prop="col.prop"
						:key="col.prop"
						:label="col.label"
						:min-width="col.minWidth"
						align="center"
					>
						<template v-if="col.prop === 'menuType'" #default="{ row }">
							{{ RadioFilter(row.menuType, menuTypeOptions) }}
						</template>
						<template v-else-if="col.prop === 'status'" #default="{ row }">
							<el-tag type="success" effect="dark" v-if="row.status === 1">启用</el-tag>
							<el-tag type="danger" effect="dark" v-else>禁用</el-tag>
						</template>
						<template v-else #default="{ row }">
							{{ row[col.prop] }}
						</template>
					</el-table-column>
					<el-table-column label="操作" min-width="150px" align="center">
						<template #default="{ row }">
							<el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
							<el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-card>
			<el-dialog
				:title="dialog.title"
				v-model="dialog.visible"
				width="500px"
				:close-on-click-modal="false"
				:before-close="handleBeforeClose"
			>
				<el-form ref="formRef" :model="formData" :rules="rules" label-width="100px" label-position="left">
					<el-form-item label="角色名称" prop="name">
						<el-input v-model="formData.name"></el-input>
					</el-form-item>
					<el-form-item label="角色代码" prop="code">
						<el-input v-model="formData.code"></el-input>
					</el-form-item>
					<el-form-item label="权限配置" prop="menuIds">
						<el-tree-select
							v-model="formData.menuIds"
							:data="menuTreeData"
							multiple
							:render-after-expand="false"
							placeholder="请选择路由路径"
							:props="{ label: 'title', children: 'children', value: 'id' }"
						/>
					</el-form-item>
					<el-form-item label="描述" prop="description">
						<el-input v-model="formData.description"></el-input>
					</el-form-item>
				</el-form>
				<template #footer>
					<el-button @click="handleBeforeClose">取消</el-button>
					<el-button type="primary" @click="handleSubmit">确定</el-button>
				</template>
			</el-dialog>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {
	fetchGetRuleData,
	fetchPostCreateRule,
	fetchDeleteRule,
	fetchUpdateRule,
	fetchGetMenuTree,
} from '~/api/modules'
import { RadioFilter } from '~/utils'

const table = reactive<TableParams<EntityRoleEntity>>({
	page: 1,
	limit: 10,
	total: 0,
	loading: false,
	data: [],
})
const columns = [
	{
		prop: 'name',
		label: '角色名称',
		minWidth: 150,
	},
	{
		prop: 'code',
		label: '角色代码',
		minWidth: 150,
	},
	{
		prop: 'description',
		label: '描述',
		minWidth: 150,
	},
	{
		prop: 'createdAt',
		label: '创建时间',
		minWidth: 150,
	},
	{
		prop: 'updatedAt',
		label: '更新时间',
		minWidth: 150,
	},
]
const menuTypeOptions = [
	{ label: '目录', value: 'M' },
	{ label: '菜单', value: 'C' },
	{ label: '按钮', value: 'F' },
]
const initDialog = () => {
	return {
		visible: false,
		title: '新增角色',
	}
}
const dialog = ref(initDialog())
const initFormData = () => {
	return {
		id: '',
		name: '',
		description: '',
		menuIds: [],
		code: '',
	}
}
const formData = ref(initFormData())
const rules = {
	name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
	menuIds: [{ required: true, message: '请设置角色权限', trigger: 'blur' }],
	code: [{ required: true, message: '请输入角色代码', trigger: 'blur' }],
}
const handleBeforeClose = () => {
	formData.value = initFormData()
	dialog.value = initDialog()
}
const handleCreate = () => {
	dialog.value.visible = true
}
const getTableList = () => {
	table.loading = true
	const params = {
		page: table.page,
		limit: table.limit,
	}
	fetchGetRuleData(params)
		.then((res) => {
			table.data = res.data.list
		})
		.finally(() => {
			table.loading = false
		})
}
const formRef = ref()
const handleSubmit = () => {
	formRef.value.validate((valid: boolean) => {
		if (valid) {
			const api = formData.value.id ? fetchUpdateRule(formData.value) : fetchPostCreateRule(formData.value)
			api.then((res) => {
				getTableList()
				ElMessage.success(res.message)
				handleBeforeClose()
			}).catch(() => {})
		}
	})
}
const handleDelete = (row: EntityMenuEntity) => {
	ElMessageBox.confirm('确认删除该角色吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(() => {
		fetchDeleteRule(row.id as number).then(() => {
			getTableList()
			ElMessage.success('删除成功')
		})
	})
}
const handleEdit = (row: EntityMenuEntity) => {
	dialog.value.title = '编辑角色'
	for (let key in formData.value) {
		formData.value[key] = row[key]
	}
	formData.value.id = row.id
	dialog.value.visible = true
}
const menuTreeData = ref<EntityMenuEntity[]>([])
const getMenuTree = () => {
	fetchGetMenuTree().then((res) => {
		menuTreeData.value = res.data || []
	})
}
onMounted(() => {
	getTableList()
	getMenuTree()
})
</script>

<style lang="scss" scoped></style>
