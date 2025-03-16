<template>
	<div class="page-wrapper">
		<div class="page-wrapper_body">
			<el-card shadow="never" :body-style="{ padding: '24px' }" mt-16px>
				<template #header>
					<el-button type="primary" @click="handleAddMenu">
						<template #icon>
							<i class="material-symbols:add-2-rounded"></i>
						</template>
						新增菜单
					</el-button>
				</template>
				<el-table :data="tableData" border row-key="id" v-loading="tableLoading">
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
					<el-table-column label="操作" width="150px" align="center">
						<template #default="{ row }">
							<el-button type="primary" size="small" @click="handleEditMenu(row)">编辑</el-button>
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
				class="custom-dialog"
			>
				<el-form ref="formRef" :model="formData" :rules="rules" label-width="100px" label-position="left">
					<el-form-item label="菜单标题" prop="title">
						<el-input v-model="formData.title"></el-input>
					</el-form-item>
					<el-form-item label="菜单类型" prop="menuType">
						<el-select v-model="formData.menuType">
							<el-option
								v-for="item in menuTypeOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="路由名称" prop="name">
						<el-input v-model="formData.name"></el-input>
					</el-form-item>
					<el-form-item label="路由路径" prop="path">
						<el-input v-model="formData.path"></el-input>
					</el-form-item>
					<el-form-item label="父级菜单" prop="parentId">
						<el-tree-select
							v-model="formData.parentId"
							:data="menuTreeData"
							check-strictly
							:render-after-expand="false"
							placeholder="请选择路由路径"
							:props="{ label: 'title', children: 'children', value: 'id' }"
						/>
					</el-form-item>
					<el-form-item label="图标" prop="icon">
						<el-input v-model="formData.icon"></el-input>
					</el-form-item>
					<el-form-item label="排序" prop="sort">
						<el-input-number v-model="formData.sort"></el-input-number>
					</el-form-item>
					<el-form-item label="菜单状态" prop="status">
						<el-switch
							v-model="formData.status"
							size="large"
							:active-value="1"
							:inactive-value="0"
							active-text="启用"
							inactive-text="禁用"
						/>
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
import { fetchPostCreateMenu, fetchGetMenuTree, fetchDeleteMenu, fetchUpdateMenu } from '~/api/modules'
import { RadioFilter } from '~/utils'
const tableData = ref<EntityMenuEntity[]>([])
const columns = [
	{
		prop: 'title',
		label: '菜单标题',
		minWidth: 150,
	},
	{
		prop: 'menuType',
		label: '类型',
		minWidth: 150,
	},
	{
		prop: 'name',
		label: '路由名称',
		minWidth: 150,
	},
	{
		prop: 'path',
		label: '路由路径',
		minWidth: 150,
	},
	{
		prop: 'redirect',
		label: '重定向',
		minWidth: 150,
	},
	{
		prop: 'icon',
		label: '图标',
		minWidth: 150,
	},
	{
		prop: 'sort',
		label: '排序',
		minWidth: 150,
	},
	{
		prop: 'status',
		label: '菜单状态',
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
		title: '新增菜单',
	}
}
const dialog = ref(initDialog())
const initFormData = () => {
	return {
		title: '',
		menuType: 'M',
		name: '',
		path: 'root',
		icon: '',
		sort: 0,
		status: 1,
		parentId: 0,
	}
}
const formData = ref(initFormData())
const rules = {
	title: [{ required: true, message: '请输入菜单标题', trigger: 'blur' }],
	menuType: [{ required: true, message: '请选择菜单标题', trigger: 'blur' }],
}
const handleBeforeClose = () => {
	formData.value = initFormData()
	dialog.value = initDialog()
}
const handleAddMenu = () => {
	dialog.value.visible = true
}
const tableLoading = ref(false)
const getMenuData = () => {
	tableLoading.value = true
	fetchGetMenuTree()
		.then((res) => {
			tableData.value = res.data
		})
		.finally(() => {
			tableLoading.value = false
		})
}
const formRef = ref()
const handleSubmit = () => {
	formRef.value.validate((valid: boolean) => {
		if (valid) {
			const api = formData.value.id ? fetchUpdateMenu(formData.value) : fetchPostCreateMenu(formData.value)
			api.then(() => {
				getMenuData()
				ElMessage.success('新增成功')
				handleBeforeClose()
			}).catch(() => {})
		}
	})
}
const handleDelete = (row: EntityMenuEntity) => {
	ElMessageBox.confirm('确认删除该菜单吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(() => {
		fetchDeleteMenu(row.id).then(() => {
			getMenuData()
			ElMessage.success('删除成功')
		})
	})
}
const handleEditMenu = (row: EntityMenuEntity) => {
	dialog.value.title = '编辑菜单'
	for (let key in row) {
		formData.value[key] = row[key]
	}
	formData.value.id = row.id
	dialog.value.visible = true
}
const menuTreeData = computed(() => {
	return [{ id: 0, title: '根目录', children: [] }, ...tableData.value]
})
onMounted(() => {
	getMenuData()
})
</script>

<style lang="scss" scoped></style>
