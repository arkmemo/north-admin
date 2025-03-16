import { get } from '~/api/request'

//获取员工信息
export const fetchEmployeeInfo = () => get<IEmployeeEntity>('/employee/info')
