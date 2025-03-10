import { createRouter, createWebHashHistory } from 'vue-router'
import { getDynamicRouter } from './routes/dynamicRouter.ts'
import { staticRouter } from '~/router/routes/staticRouter.ts'
import { setupPermission } from './guard/permission.ts'
import { setupProgress } from './guard/progress.ts'

export const router = createRouter({
	history: createWebHashHistory(),
	routes: [...staticRouter, ...getDynamicRouter],
})

setupPermission(router)
setupProgress(router)
