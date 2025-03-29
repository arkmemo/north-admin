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
					<el-table-column label="操作" min-width="150px" align="center">
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
			>
				<el-form ref="formRef" :model="formData" :rules="rules" label-width="100px" label-position="left">
					<el-form-item label="菜单类型" prop="menuType">
						<el-segmented v-model="formData.menuType" :options="menuTypeOptions" />
					</el-form-item>
					<el-form-item label="菜单标题" prop="title">
						<el-input v-model="formData.title"></el-input>
					</el-form-item>
					<el-form-item label="组件路径" v-if="formData.menuType !== 'M'">
						<el-cascader
							v-model="formData.component"
							:options="dynamicRoutes"
							:props="{
								label: 'label',
								value: 'path',
								children: 'children',
								emitPath: false,
							}"
							placeholder="组件路径"
							style="width: 100%"
							@change="handleComponentChange"
						/>
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
					<el-form-item label="是否展示" prop="isHidden">
						<el-radio-group v-model="formData.isHidden">
							<el-radio :value="0">展示</el-radio>
							<el-radio :value="1">隐藏</el-radio>
						</el-radio-group>
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
import { RadioFilter, hasOwnProperty } from '~/utils'
import type { CascaderValue } from 'element-plus'
interface IComponentMap {
	label: string
	value: string
	path: string
	children: IComponentMap[]
}
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
		prop: 'component',
		label: '组件路径',
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
const initFormData = (): ICreateMenuParams => {
	return {
		title: '',
		menuType: 'M',
		name: '',
		path: 'root',
		icon: '',
		sort: 0,
		status: 1,
		parentId: 0,
		isHidden: 0,
		component: '',
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
			tableData.value = res.data || []
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
			api.then((res) => {
				getMenuData()
				ElMessage.success(res.message)
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
		fetchDeleteMenu(row.id as number).then(() => {
			getMenuData()
			ElMessage.success('删除成功')
		})
	})
}
const handleEditMenu = (row: EntityMenuEntity) => {
	dialog.value.title = '编辑菜单'
	for (let key in formData.value) {
		if (hasOwnProperty(formData.value, key) && hasOwnProperty(row, key)) {
			formData.value[key] = row[key as keyof typeof row]
		}
	}
	formData.value.id = row.id
	dialog.value.visible = true
}
const menuTreeData = computed(() => {
	return [{ id: 0, title: '根目录', children: [] }, ...tableData.value]
})
const handleComponentChange = (value: CascaderValue) => {
	if (typeof value === 'string') {
		formData.value.path = value
	}
}
const dynamicRoutes = ref<IComponentMap[]>([])
const allVueFile = import.meta.glob('~/pages/**/*.vue', { eager: true })
const formatVueFiles = () => {
	const files = Object.keys(allVueFile)
	const tree: IComponentMap[] = []

	files.forEach((file) => {
		// 移除 ~/pages 前缀和 .vue 后缀，以及外层的 src 和 pages 目录
		const path = file.replace('/src/pages/', '').replace('.vue', '')
		const parts = path.split('/')
		// 跳过前两层目录（src 和 pages）
		const filteredParts = parts
		let current = tree

		filteredParts.forEach((part, index) => {
			if (!part) return

			const existing = current.find((item) => item.value === part)
			if (existing) {
				current = existing.children
			} else {
				const newNode = {
					label: part,
					value: part,
					path: filteredParts.slice(0, index + 1).join('/'),
					children: [],
				}
				current.push(newNode)
				current = newNode.children
			}
		})
	})
	dynamicRoutes.value = tree
}

onMounted(() => {
	getMenuData()
	formatVueFiles()
})
</script>

<style lang="scss" scoped></style>
