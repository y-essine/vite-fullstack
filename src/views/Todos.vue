<template>
    <div class="mb-12">
        <div class="w-fit xs:ml-auto sm:mx-auto space-x-5 space-y-3">
            <input
                v-model="newDescription"
                type="text"
                class="focus:ring-2 text-center focus:ring-green-700"
                placeholder="New todo name..."
            />
            <button :disabled="disabledState" class="btn green" @click="add">
                Add
            </button>
        </div>
    </div>

    <transition name="fade">
        <Spinner v-if="isLoading" />
    </transition>
    <div
        class="flex flex-wrap justify-evenly gap-6"
        v-if="!isLoading && isLoaded"
    >
        <Todo
            v-for="(todo, i) in todos"
            :key="todo._id"
            :index="i"
            :todo="todo"
            @select="select"
            @unselect="unselect"
            @edit="edit"
            @remove="remove"
        />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Todo from '@/components/Todo.vue'
import Spinner from '@/components/utils/Spinner.vue'

export default {
    data() {
        return {
            newDescription: '',
        }
    },
    components: {
        Todo,
        Spinner,
    },
    computed: {
        ...mapState('todos', ['todos', 'isLoading', 'isLoaded', 'isEditing']),

        disabledState() {
            return (
                this.isLoading ||
                !this.isLoaded ||
                this.isEditing ||
                this.newDescription.trim().length === 0 ||
                this.newDescription.trim().length > 30
            )
        },
    },
    methods: {
        ...mapActions('todos', [
            'fetchTodos',
            'selectTodo',
            'unselectTodo',
            'addTodo',
            'updateTodo',
            'deleteTodo',
        ]),

        select(todo) {
            this.selectTodo(todo)
        },

        unselect() {
            console.log('unselected')
            this.unselectTodo()
        },

        edit(todo) {
            this.updateTodo({
                _id: todo._id,
                description: todo.description,
            }).then(() => {
                this.$notify({
                    title: 'Success',
                    text: 'Todo updated!',
                    type: 'success',
                })
                this.unselect()
            })
        },
        remove(todo) {
            this.deleteTodo(todo).then(() => {
                this.$notify({
                    title: 'Success',
                    text: 'Todo deleted!',
                    type: 'success',
                })
            })
        },
        add() {
            if (this.disabledState)
                return this.$notify({
                    title: 'Error',
                    text: 'Todo description must be between 1 and 30 characters',
                    type: 'error',
                })
            this.addTodo({
                description: this.newDescription.trim(),
            }).then(() => {
                this.$notify({
                    title: 'Success',
                    text: 'Todo added!',
                    type: 'success',
                })
                this.newDescription = ''
            })
        },
    },
    mounted() {
        this.fetchTodos().catch(() => {
            this.$notify({
                title: 'Error',
                text: 'Something went wrong',
                type: 'error',
            })
        })
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
