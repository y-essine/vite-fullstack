<template>
    <transition name="fade">
        <Spinner v-if="isLoading" />
    </transition>

    <div class="mb-12">
        <div class=" w-fit xs:ml-auto sm:mx-auto  space-x-5 space-y-3">
            <input v-model="newDescription" type="text" class="focus:ring-2 text-center focus:ring-green-700"
                placeholder="New todo name..." />
            <button :disabled="!newDescription" class="btn green">
                Add
            </button>
        </div>
    </div>

    <div class="flex flex-wrap justify-evenly gap-6">
        <Todo v-for="todo in todos" :key="todo._id" :todo="todo" @select="select" @unselect="unselect"/>
    </div>
</template> 


<script>
import { mapState, mapActions } from 'vuex';

import Todo from '@/components/Todo.vue';
import Spinner from '@/components/utils/Spinner.vue';

import axios from 'axios';

let online = true;

let offline_server = 'http://localhost:3000';

let back_server = online ? '' : offline_server;


export default {
    data() {
        return {
            newDescription: "",
            editedDescription: "",
            selected: {},
        }
    },
    components: {
        Todo,
        Spinner,
    },
    computed: {
        ...mapState('todos', ['todos', 'isLoading', 'isLoaded']),
    },
    methods: {
        ...mapActions('todos', ['fetchTodos', 'selectTodo', 'unselectTodo', 'addTodo', 'updateTodo', 'deleteTodo']),

        select(todo) {
            this.selectTodo(todo);
        },

        unselect() {
            this.unselectTodo();
        },

        edit(todo) {
            this.updateTodo({
                id: todo._id,
                description: this.editedDescription,
            });
            this.unselect();
        }

        // async addItem() {
        //     const res = await axios.post(
        //         back_server + '/api/todoListItems/', { description: this.description }
        //     )
        //     this.todos.push(res.data);
        //     this.description = "";
        // },
        // async removeItem(todo, i) {
        //     await axios.delete(back_server + '/api/todoListItems/' + todo._id);
        //     this.todos.splice(i, 1);
        // },
        // async editItem(todo, i) {
        //     const res = await axios.put(back_server + '/api/todoListItems/' + todo._id, { description: this.editedDescription });
        //     this.todos[i] = res.data;
        //     this.unselect();
        // },
        // select(todo) {
        //     this.selected = todo;
        //     this.editedDescription = todo.description;
        // },
        // unselect() {
        //     this.selected = {};
        //     this.editedDescription = {};
        // },
        // isSelected(todo) {
        //     return this.selected._id == todo._id
        // }
    },
    async created() {
        // try {
        //     const res = await axios.get(
        //         back_server + '/api/todoListItems/'
        //     )
        //     this.loading = false;
        //     this.todos = res.data


        // } catch (e) {
        //     console.error(e)
        // }
    },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>