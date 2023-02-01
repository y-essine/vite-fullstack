import { createRouter, createWebHistory } from "vue-router";

import { ROUTE_PATHS, ROUTE_NAMES } from '@/helpers/routesHelper.js';

import Main from '@/views/Main.vue';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';

const routes = [
    {
        path: ROUTE_PATHS.MAIN,
        name: ROUTE_NAMES.MAIN,
        component: Main,
        children: [
            {
                path: ROUTE_PATHS.HOME,
                name: ROUTE_NAMES.HOME,
                component: Home,
            },
            {
                path: ROUTE_PATHS.ABOUT,
                name: ROUTE_NAMES.ABOUT,
                component: About,
            },
            {
                path: ROUTE_PATHS.PRODUCTS,
                name: ROUTE_NAMES.PRODUCTS,
                component: () => import('@/views/Products.vue'), //lazy loaded
            },
            {
                path: ROUTE_PATHS.TODOS,
                name: ROUTE_NAMES.TODOS,
                component: () => import('@/views/Todos.vue'),
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        NProgress.start();
    }
    next();
})

router.afterEach(() => {
    // Complete the animation of the route progress bar.
    NProgress.done();
})

export default router;