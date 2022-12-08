export default {
    namespaced: true,
    state: {
        products: [],
        isLoading: false,
        isLoaded: false,
    },
    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products
        },
        SET_IS_LOADING(state, isLoading) {
            state.isLoading = isLoading
        },
        SET_IS_LOADED(state, isLoaded) {
            state.isLoaded = isLoaded
        }
    },
    actions: {
        loadProducts({ commit }) {
        }
    }
}