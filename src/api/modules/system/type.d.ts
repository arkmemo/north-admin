interface EntityMenuEntity {
	children?: EntityMenuEntity[]
	/**
	 * 按钮权限字符（仅按钮需要）
	 */
	code?: string
	/**
	 * 组件路径（仅菜单需要）
	 */
	component?: string
	createdAt?: string
	/**
	 * 目录 & 菜单的图标
	 */
	icon?: string
	id?: number
	/**
	 * 是否缓存（仅菜单需要）
	 */
	isCache?: number
	/**
	 * 是否外链
	 */
	isFrame?: number
	/**
	 * 菜单类型（M: 目录, C: 菜单, F: 按钮）
	 */
	menuType: MenuType
	/**
	 * 菜单唯一标识
	 */
	name?: string
	/**
	 * 父级菜单 ID
	 */
	parentId?: number
	/**
	 * 路由路径（目录 & 菜单需要）
	 */
	path?: string
	permissions?: EntityPermissionEntity[]
	/**
	 * 排序
	 */
	sort?: number
	/**
	 * 状态（0: 禁用, 1: 启用）
	 */
	status?: number
	/**
	 * 菜单标题
	 */
	title: string
	updatedAt?: string
}

/**
 * 菜单类型（M: 目录, C: 菜单, F: 按钮）
 */
enum MenuType {
	C = 'C',
	F = 'F',
	M = 'M',
}

interface EntityPermissionEntity {
	code: string
	createdAt?: string
	id?: number
	menuId: number
	name: string
	sort: number
	status: number
	updatedAt?: string
}
/**
 * entity.RoleEntity
 */
interface EntityRoleEntity {
	code?: string
	createdAt?: string
	description?: string
	id?: number
	menus?: EntityMenuEntity[]
	name?: string
	updatedAt?: string
}

interface EntityDepartmentTree {
	children: EntityDepartmentTree[]
	createdAt: string
	id: number
	name: string
	pid: number
	updatedAt: string
}
interface ICreateMenuParams {
	title: string
	menuType: string
	name: string
	path: string
	icon: string
	sort: number
	status: number
	parentId: number
	id?: number
}
interface ICreateRoleParams {
	name: string
	code: string
	description: string
	menuIds: number[]
	id?: number
}
interface ICreateEmployeeParams {
	username: string
	password: string
	phone: string
	roleIds: number[]
	departmentId: string
	id?: number
}
interface IEmployeeList {
	id: number
	username: string
	phone: string
	status: number
	statusDesc: string
	roles: {
		id: number
		name: string
	}[]
	departmentId: number
	createdAt: string
	updatedAt: string
}
interface IAllRoleList {
	label: string
	value: number
}
