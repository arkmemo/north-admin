<template>
	<div class="page-wrapper">
		<div class="page-wrapper_body">
			<el-card shadow="never" :body-style="{ padding: '24px' }">
				<template #header>
					<el-button type="primary" @click="handleCreate">
						<template #icon>
							<i class="material-symbols:add-2-rounded"></i>
						</template>
						新增员工
					</el-button>
				</template>
				<table-page
					:data="table.data"
					:total="table.total"
					v-model:page="tableSearchParams.page"
					v-model:limit="tableSearchParams.limit"
					:border="true"
					max-height="calc(100vh - 198px)"
					:loading="table.loading"
				>
					<el-table-column
						v-for="col in columns"
						:show-overflow-tooltip="true"
						:prop="col.prop"
						:key="col.prop"
						:label="col.label"
						:min-width="col.minWidth"
						align="center"
					>
						<template v-if="col.prop === 'roles'" #default="{ row }: { row: IEmployeeList }">
							<el-popover placement="top" width="auto" :disabled="row.roles.length < 2">
								<div class="role-tag">
									<el-tag v-for="item in row.roles" :key="item.id" style="margin-right: 16px">
										{{ item.name }}
									</el-tag>
								</div>
								<template #reference>
									<div>
										<el-tag
											v-for="(item, index) in row.roles"
											:key="item.id"
											v-show="index < 2"
											style="margin-right: 16px"
										>
											{{ item.name }}
										</el-tag>
										<span v-show="row.roles.length > 1">...</span>
									</div>
								</template>
							</el-popover>
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
				</table-page>
			</el-card>
			<el-dialog
				:title="dialog.title"
				v-model="dialog.visible"
				width="500px"
				:close-on-click-modal="false"
				:before-close="handleBeforeClose"
			>
				<el-form
					ref="formRef"
					:model="formData"
					:rules="rules"
					label-width="100px"
					label-position="left"
					autocomplete="off"
				>
					<el-form-item label="用户名" prop="username">
						<el-input v-model="formData.username" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password" v-if="!formData.id">
						<el-input
							v-model="formData.password"
							type="password"
							show-password
							autocomplete="new-password"
						></el-input>
					</el-form-item>
					<el-form-item label="手机号" prop="phone">
						<el-input v-model="formData.phone"></el-input>
					</el-form-item>
					<el-form-item label="部门" prop="departmentId">
						<el-tree-select
							v-model="formData.departmentId"
							:data="departmentTreeData"
							:render-after-expand="false"
							placeholder="请选择部门"
							:props="{ label: 'name', children: 'children', value: 'id' }"
						/>
					</el-form-item>
					<el-form-item label="角色" prop="roleIds">
						<el-select v-model="formData.roleIds" :multiple="true" :clearable="true">
							<el-option
								v-for="item in ruleList"
								:key="item.value"
								:value="item.value"
								:label="item.label"
							></el-option>
						</el-select>
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
	fetchGetEmployeeData,
	fetchPostCreateEmployee,
	fetchDeleteEmployee,
	fetchUpdateEmployee,
	fetchGetMenuTree,
	fetchDepartmentTree,
	fetchGetAllRule,
} from '~/api/modules'
import { hasOwnProperty } from '~/utils'
import type { FormInstance } from 'element-plus'

const table = reactive<TableParams<IEmployeeList>>({
	total: 0,
	loading: false,
	data: [],
})
const tableSearchParams = reactive({
	page: 1,
	limit: 10,
})
const columns = [
	{
		prop: 'username',
		label: '用户名',
		minWidth: 150,
	},
	{
		prop: 'phone',
		label: '手机号',
		minWidth: 150,
	},
	{
		prop: 'statusDesc',
		label: '状态',
		minWidth: 150,
	},
	{
		prop: 'roles',
		label: '角色',
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
const initDialog = () => {
	return {
		visible: false,
		title: '新增角色',
	}
}
const dialog = ref(initDialog())
const initFormData = (): ICreateEmployeeParams => {
	return {
		username: '',
		password: '',
		phone: '',
		roleIds: [],
		departmentId: '',
	}
}
const formData = ref(initFormData())
const rules = reactive({
	username: [{ required: true, message: '请输入用户名', trigger: ['blur', 'change'] }],
	password: [{ required: true, message: '请输入密码', trigger: ['blur', 'change'] }],
	phone: [
		{ required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
		{
			pattern: /^1[3-9]\d{9}$/,
			message: '请输入正确的手机号格式',
			trigger: ['blur', 'change'],
		},
	],
	roleIds: [{ required: true, message: '请选择角色', trigger: ['blur', 'change'] }],
	departmentId: [{ required: true, message: '请选择部门', trigger: ['blur', 'change'] }],
})
const handleBeforeClose = () => {
	formData.value = initFormData()
	console.log(formData.value)

	formRef.value?.resetFields()
	dialog.value = initDialog()
}
const handleCreate = () => {
	dialog.value.visible = true
}
const getTableList = () => {
	table.loading = true
	fetchGetEmployeeData(tableSearchParams)
		.then((res) => {
			table.data = res.data.list
			table.total = res.data.total
		})
		.finally(() => {
			table.loading = false
		})
}
const formRef = ref<FormInstance>()
const handleSubmit = () => {
	formRef.value?.validate((valid: boolean) => {
		if (valid) {
			const api = formData.value.id
				? fetchUpdateEmployee(formData.value)
				: fetchPostCreateEmployee(formData.value)
			api.then((res) => {
				getTableList()
				ElMessage.success(res.message)
				handleBeforeClose()
			}).catch(() => {})
		}
	})
}
const handleDelete = (row: IEmployeeList) => {
	ElMessageBox.confirm('确认删除该角色吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(() => {
		fetchDeleteEmployee(row.id as number).then(() => {
			getTableList()
			ElMessage.success('删除成功')
		})
	})
}
const handleEdit = (row: IEmployeeList) => {
	dialog.value.title = '编辑员工'
	for (let key in formData.value) {
		if (hasOwnProperty(formData.value, key) && hasOwnProperty(row, key)) {
			formData.value[key] = row[key as keyof typeof row]
		}
	}
	formData.value.roleIds = row.roles.map((item) => item.id)
	formData.value.id = row.id
	dialog.value.visible = true
}
const menuTreeData = ref<EntityMenuEntity[]>([])
const getMenuTree = () => {
	fetchGetMenuTree().then((res) => {
		menuTreeData.value = res.data || []
	})
}
const departmentTreeData = ref<EntityDepartmentTree[]>([])
const getTreeData = async () => {
	const { data } = await fetchDepartmentTree()
	departmentTreeData.value = data
}
const ruleList = ref<IAllRoleList[]>([])
const queryAllRule = async () => {
	const { data } = await fetchGetAllRule()
	ruleList.value = data
}
onMounted(() => {
	getTableList()
	getMenuTree()
	getTreeData()
	queryAllRule()
})
</script>

<style lang="scss" scoped>
.role-tag {
	max-width: 300px;
	min-width: 160px;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 10px;
}
</style>
