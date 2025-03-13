import { get, post, _delete, put } from '../../request'

export const fetchGetMenuTree = () => get<EntityMenuEntity[]>('/menu/tree')

export const fetchPostCreateMenu = (params) => post('/menu', params)

export const fetchDeleteMenu = (id: number) => _delete(`/menu/${id}`)

export const fetchUpdateMenu = (params) => put(`/menu`, params)
