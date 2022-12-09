import { createApp } from 'vue';
import router from '@/router';
import store from '@/store';

import notifications from '@kyvg/vue3-notification';

import App from '@/App.vue';

import '@/index.css';

createApp(App)
.use(router)
.use(store)
.use(notifications)
.mount('#app')
