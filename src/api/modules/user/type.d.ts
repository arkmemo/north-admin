interface IUserInfo {
	avatar: string
	birthday: string
	createdAt: string
	gender: number
	genderText: string
	id: number
	phone: string
	status: number
	statusText: string
	updatedAt: string
	username: string
}

interface IAuthLogin {
	captcha: string
	password: string
	phone: string
	type: 'code' | 'password'
}
