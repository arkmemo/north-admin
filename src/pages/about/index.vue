<template>
	<div class="app-container">
		<el-form ref="formValidator" :model="formData" :rules="rules" :label-width="80">
			<el-form-item label="标题" prop="title">
				<el-input v-model="formData.title" placeholder="请输入标题" />
			</el-form-item>
			<el-form-item label="答案" prop="answer">
				<el-input v-model="formData.answer" placeholder="请输入答案" />
			</el-form-item>
			<el-form-item label="路径地址" prop="content">
				<el-input v-model="formData.content" placeholder="请输入路径地址" />
			</el-form-item>
			<el-form-item label="题目类型" prop="type">
				<el-select v-model="formData.type" placeholder="题目类型">
					<el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { type FormRules } from 'element-plus'

//#region 增
type FormOptions = { value: number; label: string }
interface createOrUpdateFormData {
	id?: string | number
	/** 标题 */
	title: string
	/** 答案 */
	answer: string
	/** 路径地址 */
	content: string
	/** 类型 */
	type: number
	/** 选项 */
	options: FormOptions[]
}

const createFormData = () => ({
	title: '',
	answer: '',
	content: '',
	type: 0,
	options: [],
})

const typeList = ref([
	{ value: 0, label: '图片' },
	{ value: 1, label: '音乐' },
	{ value: 2, label: '视力测试' },
])

const formValidator = ref()
const formData = ref<createOrUpdateFormData>(createFormData())
const rules: FormRules<createOrUpdateFormData> = {
	title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
	answer: [{ required: true, message: '请输入答案', trigger: 'blur' }],
	content: [{ required: true, message: '请输入路径', trigger: 'blur' }],
	type: [{ required: true, message: '请选择类型', trigger: 'change' }],
}
</script>

<style scoped></style>
