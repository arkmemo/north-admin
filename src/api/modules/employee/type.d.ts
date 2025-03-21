interface IEmployeeEntity {
	createdAt?: string
	departmentId?: number
	id?: number
	phone?: string
	status?: number
	statusDesc?: string
	updatedAt?: string
	username?: string
}

interface IEmployeeListRequest extends IPage {
	/**
	 * 部门ID
	 */
	departmentId?: number
	/**
	 * 手机号
	 */
	phone?: string
	/**
	 * 用户名
	 */
	username?: string
}
