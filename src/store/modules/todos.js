import Todos from '@/services/Todos';
import getRandomEmoji from '@/helpers/randomEmoji';

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

const prepareTodo = (todo, emoji = false) => {
    let trimmed = todo.description.trim();
    let desc = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    if (emoji) todo.description = getRandomEmoji() + " " + desc;
    return todo;
}

export default {
    namespaced: true,
    state: {
        todos: [...todosList],
        isLoading: false,
        isLoaded: false,
        isEditing: false,
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
        SET_IS_EDITING(state, isEditing) {
            state.isEditing = isEditing
        },
        SET_SELECTED_TODO(state, todo) {
            state.selectedTodo = todo
        },
        UPDATE_TODO: (state, todo) => {
            const index = state.todos.findIndex(t => t._id === todo._id);
            if (index !== -1) {
                todo.description = todo.description.trim();
                state.todos.splice(index, 1, todo);
            }
        },
        DELETE_TODO: (state, todo) => {
            const index = state.todos.findIndex(t => t._id === todo._id);
            if (index !== -1) {
                state.todos.splice(index, 1);
            }
        },
        ADD_TODO: (state, todo) => {
            state.todos.unshift(todo);
        },
        SET_TODO_ID: (state, { id, todo }) => {
            todo._id = id;
            state.todos.unshift(todo);
        }
    },
    actions: {
        selectTodo: ({ commit }, todo) => {
            commit('SET_SELECTED_TODO', todo);
        },
        unselectTodo: ({ commit }) => {
            commit('SET_SELECTED_TODO', null);
        },
        fetchTodos: async ({ commit }) => {
            commit('SET_TODOS', true);
            commit('SET_IS_LOADING', true)
            commit('SET_IS_LOADED', false);

            await Todos.getTodos()
                .then(r => {
                    commit('SET_TODOS', r.data);
                    commit('SET_IS_LOADING', false);
                    commit('SET_IS_LOADED', true);
                })
        },
        updateTodo: async ({ commit }, todo) => {
            commit('SET_IS_EDITING', true)
            await Todos.editTodo(todo).then(r => {
                commit('UPDATE_TODO', prepareTodo(todo));
                commit('SET_IS_EDITING', false);
            }).catch(error => {
                console.log(error);
                commit('SET_IS_EDITING', false);
            });
        },
        deleteTodo: async ({ commit }, todo) => {
            commit('SET_IS_EDITING', true)
            await Todos.deleteTodo(todo).then(r => {
                commit('DELETE_TODO', todo);
                commit('SET_IS_EDITING', false);
            }).catch(error => {
                console.log(error);
                commit('SET_IS_EDITING', false);
            }
            );
        },
        addTodo: async ({ commit }, localTodo) => {
            commit('SET_IS_EDITING', true)
            let prepared = prepareTodo(localTodo, true);
            await Todos.addTodo(prepared)
                .then(r => {
                    let todo = r.data;
                    commit('ADD_TODO', todo);
                    commit('SET_IS_EDITING', false);
                })
                .catch(error => {
                    console.log(error);
                    commit('SET_IS_EDITING', false);
                });
        }
    }
}