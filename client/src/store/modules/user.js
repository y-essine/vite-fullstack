export default {
    namespaced: true,
    state: {
        name: 'Mike Tyson',
    },
    mutations: {
        SET_NAME(state, name) {
            state.name = name
        }
    },
    actions: {
        setName({ commit }, name) {
            commit('SET_NAME', name)
        }
    }
}