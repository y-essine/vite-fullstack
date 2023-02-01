import { Api } from '@/services/Api';

const prefix = 'todos/';

export default {
    getTodos() {
        return Api.get(prefix + 'all');
    },
    addTodo(todo) {
        return Api.post(prefix, todo);
    },
    editTodo(todo) {
        return Api.put(prefix + todo._id, todo);
    },
    deleteTodo(todo) {
        return Api.delete(prefix + todo._id);
    }
}