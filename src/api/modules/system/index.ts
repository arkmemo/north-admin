import { get, post, _delete, put } from '../../request'

export const fetchGetMenuTree = () => get<EntityMenuEntity[]>('/menu/tree')

export const fetchPostCreateMenu = (params) => post('/menu', params)

export const fetchDeleteMenu = (id: number) => _delete(`/menu/${id}`)

export const fetchUpdateMenu = (params) => put(`/menu`, params)

export const fetchGetRuleData = (params) => get<IList<EntityRoleEntity>>('/role/list', params)

export const fetchPostCreateRule = (params) => post('/role', params)

export const fetchDeleteRule = (id: number) => _delete(`/role/${id}`)

export const fetchUpdateRule = (params) => put(`/role`, params)

export const fetchDepartmentTree = () => get<EntityDepartmentTree[]>('/department/tree')
