interface EntityMenuEntity {
	children?: EntityMenuEntity[]
	id: number
	name: string
	path: string
	redirect: string
	icon: string
	title: string
	component: string
	menuType: string
	parentId: number
	sort: number
	status: number
	isFrame: number
	isCache: number
	isHidden: number
	isHome: number
	code: string
	createdAt: string
	updatedAt: string
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
	isHidden: 0 | 1
	component: string
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
