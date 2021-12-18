import { createRouter, createWebHistory } from "vue-router";

import Home from '/src/components/Home.vue'
import About from '/src/components/About.vue'
// import Products from '/src/components/Products.vue'
// import Todos from '/src/components/Todos.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/products',
        name: 'Products',
        component: () => import('/src/components/Products.vue'), //lazy loaded
    },
    {
        path: '/todos',
        name: 'Todos',
        component: () => import('/src/components/Todos.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        NProgress.start()
    }
    next()
})

router.afterEach((to, from) => {
    // Complete the animation of the route progress bar.
    NProgress.done()
})



export default router