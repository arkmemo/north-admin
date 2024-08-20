// 自动导入modules下面的所有路由
import { moduleToRoutes } from '~/router/helper/transformHelp.ts'

const routerModules = import.meta.glob('./modules/*.ts', { eager: true })

export const getDynamicRouter = moduleToRoutes(routerModules)
