import { get } from '~/api/request'

//获取员工信息
export const fetchEmployeeInfo = () => get<IEmployeeEntity>('/employee/info')

// 获取员工列表
export const fetchEmployeeList = (params: IEmployeeListRequest) => get<IList<IEmployeeEntity>>('/employee', params)
