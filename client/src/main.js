import { createApp } from 'vue';
import router from '@/router';
import store from '@/store';

import notifications from '@kyvg/vue3-notification';

import App from '@/App.vue';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSave, faEdit, faTrash, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
library.add(faSave, faEdit, faTrash, faTimesCircle);

import '@/index.css';


createApp(App)
    .use(router)
    .use(store)
    .use(notifications)
    .component('FontAwesomeIcon', FontAwesomeIcon)
    .mount('#app')
