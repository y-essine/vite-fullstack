export default {
    namespaced: true,
    state: {
        todos: [],
        isLoading: false,
        isLoaded: false,
    },
    mutations: {
        SET_TODOS(state, todos) {
            state.todos = todos
        },
        SET_IS_LOADING(state, isLoading) {
            state.isLoading = isLoading
        },
        SET_IS_LOADED(state, isLoaded) {
            state.isLoaded = isLoaded
        },
    },
    actions: {
        loadTodos({ commit }) {
        },
    }
}