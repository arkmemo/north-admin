import { createApp } from 'vue'
import App from './App.vue'
import { Icon } from '@iconify/vue'
import { router } from '~/router'
import pinia from './stores'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '~/styles'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
app.component('Icon', Icon)
app.use(pinia)
app.use(router)
app.mount('#app')
