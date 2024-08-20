import { createApp } from 'vue'
import '~/style'
import App from './App.vue'
import { Icon } from '@iconify/vue'
import { router } from '~/router'
import pinia from './stores'

const app = createApp(App)
app.component('Icon', Icon)
app.use(pinia)
app.use(router)
app.mount('#app')
