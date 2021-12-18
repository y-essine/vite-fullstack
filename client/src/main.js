import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import notifications from '@kyvg/vue3-notification'

import './index.css'

createApp(App)
.use(router)
.use(store)
.use(notifications)
.mount('#app')
