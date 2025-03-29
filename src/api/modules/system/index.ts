import { get, post, _delete, put } from '../../request'

export const fetchGetMenuTree = () => get<EntityMenuEntity[]>('/menu/tree')

export const fetchPostCreateMenu = (params: ICreateMenuParams) => post('/menu', params)

export const fetchDeleteMenu = (id: number) => _delete(`/menu/${id}`)

export const fetchUpdateMenu = (params: ICreateMenuParams) => put(`/menu`, params)

export const fetchGetRuleData = (params: IPage) => get<IList<EntityRoleEntity>>('/role/list', params)

export const fetchPostCreateRule = (params: ICreateRoleParams) => post('/role', params)

export const fetchDeleteRule = (id: number) => _delete(`/role/${id}`)

export const fetchUpdateRule = (params: ICreateRoleParams) => put(`/role`, params)
export const fetchGetAllRule = () => get<IAllRoleList[]>(`/role/select`)

export const fetchDepartmentTree = () => get<EntityDepartmentTree[]>('/department/tree')

export const fetchGetEmployeeData = (params: IPage) => get<IList<IEmployeeList>>('/employee', params)

export const fetchPostCreateEmployee = (params: ICreateEmployeeParams) => post('/employee', params)

export const fetchDeleteEmployee = (id: number) => _delete(`/employee/${id}`)

export const fetchUpdateEmployee = (params: ICreateEmployeeParams) => put(`/employee`, params)
