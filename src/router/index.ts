import { createRouter, createWebHistory } from 'vue-router'
import { getDynamicRouter } from './routes/dynamicRouter.ts'
import { staticRouter } from '~/router/routes/staticRouter.ts'

export const router = createRouter({
	history: createWebHistory('/north-admin/'),
	routes: [...staticRouter, ...getDynamicRouter],
})
