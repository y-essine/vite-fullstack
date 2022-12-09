import Todos from '@/services/Todos';

const todosList = [
    {
        _id: 1,
        description: '⚡ Do sumn coo\'',
    },
    {
        _id: 2,
        description: '🦼 Travel the world'
    },
    {
        _id: 3,
        description: '😭 Whatever cuh',
    },

]

export default {
    namespaced: true,
    state: {
        todos: [ ...todosList ],
        isLoading: false,
        isLoaded: false,
        selectedTodo: null,
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
        SET_SELECTED_TODO(state, todo) {
            state.selectedTodo = todo
        }
    },
    actions: {
        async fetchTodos({ commit }) {
            commit('SET_TODOS', true);
            commit('SET_IS_LOADED', false);

            await Todos.getTodos()
                .then(response => {
                    commit('SET_TODOS', response.data);
                    commit('SET_IS_LOADING', false);
                    commit('SET_IS_LOADED', true);
                })
                .catch(error => {
                    console.log(error);
                    commit('SET_IS_LOADING', false);
                    commit('SET_IS_LOADED', false);
                });
        },
        selectTodo: ({ commit }, todo) => {
            commit('SET_SELECTED_TODO', todo);
        },
        unselectTodo: ({ commit }) => {
            commit('SET_SELECTED_TODO', null);
        }
    }
}