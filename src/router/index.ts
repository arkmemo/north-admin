import { createRouter, createWebHashHistory } from 'vue-router'
import { getDynamicRouter } from './routes/dynamicRouter.ts'
import { staticRouter } from '~/router/routes/staticRouter.ts'

export const router = createRouter({
	

	history: createWebHashHistory(),
	routes: [...staticRouter, ...getDynamicRouter],
})

router.beforeEach((to, from, next) => {
	if(to.name=="login"){
		next()
	}
	if (to.name !== 'login' && !localStorage.getItem('token')) next({ name: 'login' })
	next()
})