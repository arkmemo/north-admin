<template>
	<div class="h-full relative overflow-hidden bg-gray-50 dark:bg-dark-800">
		<RippleBackground />
		<WaveBackground />

		<div class="h-full flex items-center justify-center px-4 md:px-0">
			<!-- 左侧图片部分 -->
			<div class="hidden md:flex md:flex-1 justify-center items-center">
				<img
					class="max-w-md w-full transform hover:scale-105 transition-transform duration-500"
					src="../../assets/images/auth/login-background.svg"
					alt="login background"
				/>
			</div>

			<!-- 右侧登录卡片 -->
			<div class="w-full md:w-1/2 flex justify-center">
				<div
					class="w-full max-w-md bg-white dark:bg-dark-700 rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl"
				>
					<!-- 卡片头部 -->
					<div class="text-center py-6 px-4 bg-gradient-to-r from-blue-500 to-indigo-600">
						<h1 class="text-2xl font-bold text-white mb-1">登录系统</h1>
						<p class="text-sm text-white opacity-80">欢迎回来，请登录您的账户</p>
					</div>

					<!-- 登录选项卡 -->
					<div class="flex border-b border-gray-200 dark:border-dark-500">
						<div
							class="flex-1 text-center py-3 cursor-pointer transition-colors relative"
							:class="
								formData.type === 'password'
									? 'text-blue-500 font-medium'
									: 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
							"
							@click="formData.type = 'password'"
						>
							密码登录
							<div
								v-if="formData.type === 'password'"
								class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
							></div>
						</div>
						<div
							class="flex-1 text-center py-3 cursor-pointer transition-colors relative"
							:class="
								formData.type === 'code'
									? 'text-blue-500 font-medium'
									: 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
							"
							@click="formData.type = 'code'"
						>
							验证码登录
							<div
								v-if="formData.type === 'code'"
								class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
							></div>
						</div>
					</div>

					<!-- 表单 -->
					<div class="px-6 py-6">
						<el-form :model="formData" :rules="rules" ref="loginForm" class="space-y-5">
							<!-- 手机号输入 -->
							<el-form-item prop="phone">
								<el-input
									v-model="formData.phone"
									placeholder="请输入手机号"
									prefix-icon="User"
									class="h-11 rounded-lg"
								/>
							</el-form-item>

							<!-- 密码输入 -->
							<el-form-item v-if="formData.type === 'password'" prop="password">
								<el-input
									v-model="formData.password"
									placeholder="请输入密码"
									type="password"
									prefix-icon="Lock"
									show-password
									class="h-11 rounded-lg"
								/>
							</el-form-item>

							<!-- 验证码输入 -->
							<el-form-item v-else prop="captcha" class="mb-0">
								<div class="flex space-x-2 w-full">
									<el-input
										v-model="formData.captcha"
										placeholder="请输入验证码"
										prefix-icon="Key"
										class="h-11 rounded-lg flex-1"
									/>
									<el-button
										type="primary"
										class="w-32 !h-11 text-sm font-medium"
										:disabled="countdown > 0 || !isPhoneValid"
										@click="sendCaptcha"
									>
										{{ countdown > 0 ? `${countdown}秒后重试` : '获取验证码' }}
									</el-button>
								</div>
							</el-form-item>

							<!-- 额外选项 -->
							<div class="flex justify-between items-center text-sm">
								<el-checkbox v-model="rememberMe" class="text-gray-600 dark:text-gray-300"
									>记住我</el-checkbox
								>
								<a href="#" class="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
									>忘记密码?</a
								>
							</div>

							<!-- 登录按钮 -->
							<el-button
								type="primary"
								class="w-full !h-12 !text-base font-medium !rounded-full mt-6"
								:loading="loading"
								@click="handleSubmit"
							>
								登录
							</el-button>

							<!-- 底部链接 -->
							<div class="flex justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400 mt-6">
								<a href="#" class="hover:text-blue-500 transition-colors">用户条款</a>
								<a href="#" class="hover:text-blue-500 transition-colors">隐私协议</a>
							</div>
						</el-form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
const formData = ref<IAuthLogin>({
	phone: '13800013800',
	password: '123456Aa',
	captcha: '',
	type: 'password',
})

const router = useRouter()
const { login } = useUserStore()
// 表单校验规则
const rules = {
	phone: [
		{ required: true, message: '请输入手机号', trigger: 'blur' },
		{ pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
	],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 6, message: '密码至少为6位', trigger: 'blur' },
	],
	captcha: [
		{ required: true, message: '请输入验证码', trigger: 'blur' },
		{ min: 4, max: 6, message: '验证码长度在4到6位之间', trigger: 'blur' },
	],
}

const loginForm = ref<FormInstance>()
const loading = ref(false)
const rememberMe = ref(false)

// 验证码倒计时
const countdown = ref(0)
let timer: ReturnType<typeof setInterval>

// 检查手机号是否有效
const isPhoneValid = computed(() => {
	return /^1[3-9]\d{9}$/.test(formData.value.phone)
})

// 模拟发送验证码
const sendCaptcha = async () => {
	if (!isPhoneValid.value) {
		ElMessage.error('请输入正确的手机号')
		return
	}

	try {
		// 模拟API请求
		await new Promise((resolve) => setTimeout(resolve, 1000))

		// 开始倒计时
		countdown.value = 60
		timer = setInterval(() => {
			countdown.value--
			if (countdown.value <= 0) {
				clearInterval(timer)
			}
		}, 1000)

		ElMessage.success('验证码已发送，请查收')
	} catch (error) {
		ElMessage.error('验证码发送失败，请稍后重试')
	}
}

// 提交登录
const handleSubmit = async () => {
	if (!loginForm.value) return

	await loginForm.value.validate(async (valid) => {
		if (!valid) return

		loading.value = true

		try {
			// 模拟API请求
			await login(formData.value)
			ElMessage.success('登录成功')
			router.push('/home')
		} catch (error) {
			ElMessage.error('登录失败，请检查账号密码')
		} finally {
			loading.value = false
		}
	})
}

// 组件销毁前清除定时器
onBeforeUnmount(() => {
	if (timer) {
		clearInterval(timer)
	}
})
</script>

<style scoped lang="scss">
.login-card {
	width: 400px;
	border-radius: 12px;
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
	margin: 0 auto;
	overflow: hidden;
	padding: 0;
}

.login-header {
	text-align: center;
	padding: 24px 0;
	background: linear-gradient(135deg, #409eff, #5a75fa);
	color: white;
	margin-bottom: 20px;
}

.login-header h1 {
	font-size: 28px;
	margin: 0;
}

.subtitle {
	font-size: 14px;
	margin-top: 8px;
	opacity: 0.8;
}

.login-tabs {
	display: flex;
	border-bottom: 1px solid #e0e0e0;
	margin-bottom: 20px;
}

.tab {
	flex: 1;
	text-align: center;
	padding: 10px 0;
	cursor: pointer;
	transition: all 0.3s;
	color: #606266;
	position: relative;
}

.tab.active {
	color: #409eff;
	font-weight: 500;
}

.tab.active::after {
	content: '';
	position: absolute;
	bottom: -1px;
	left: 0;
	right: 0;
	height: 2px;
	background-color: #409eff;
}

.login-form {
	padding: 0 24px 24px;
}

.captcha-container {
	display: flex;
	gap: 10px;
}

.captcha-button {
	flex-shrink: 0;
	width: 120px;
	white-space: nowrap;
}

.submit-button {
	width: 100%;
	height: 44px;
	border-radius: 22px;
	margin-top: 10px;
	font-size: 16px;
	font-weight: 500;
}

.login-options {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 16px;
	color: #606266;
}

.forgot-password {
	color: #409eff;
	text-decoration: none;
}

.forgot-password:hover {
	text-decoration: underline;
}
</style>
