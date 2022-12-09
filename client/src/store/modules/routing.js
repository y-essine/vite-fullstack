import router from "@/router"

import { ROUTE_NAMES } from "@/helpers/routesHelper"

const ROUTES = Object.keys(ROUTE_NAMES)

export default {
    namespaced: true,
    state: {
        routes: [
            ...ROUTES
        ],
        currentRoute: ROUTE_NAMES.HOME
    },
    mutations: {
        SET_CURRENT_ROUTE(state, routeName) {
            state.currentRoute = routeName;
        }
    },
    actions: {
        goTo({ commit, state }, routeName) {
            if (state.routes.includes(routeName.toUpperCase())) {
                commit("SET_CURRENT_ROUTE", routeName);
                router.push({ name: routeName });
            } else {
                console.error(`Route ${routeName} does not exist`);
            }
        },

        initRoute({ commit, state }) {
            let route = router.currentRoute.value.name;
            if (!route || state.routes.includes(route.toUpperCase()) === false) {
                route = ROUTE_NAMES.HOME;
                router.push({ name: route });
            }
            commit("SET_CURRENT_ROUTE", route);
        }
    },
    getters: {
        isHome: state => {
            return state.currentRoute === ROUTE_NAMES.HOME
        }
    }
}