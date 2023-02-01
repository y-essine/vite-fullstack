import Products from '@/services/Products'

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
        async fetchProducts({ commit }, category) {
            commit('SET_IS_LOADING', true);
            commit('SET_IS_LOADED', false);

            await Products.getByCategory(category)
                .then(response => {
                    commit('SET_PRODUCTS', response.data);
                    commit('SET_IS_LOADING', false);
                    commit('SET_IS_LOADED', true);
                })
                .catch(error => {
                    console.log(error);
                    commit('SET_IS_LOADING', false);
                    commit('SET_IS_LOADED', false);
                });
        }
    }
}