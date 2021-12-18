<template>
    <link rel="stylesheet" href="https://pagecdn.io/lib/font-awesome/5.10.0-11/css/all.min.css" />
    <transition name="fade">
        <span
            v-if="loading"
            class="text-red-500 opacity-75 fixed top-1/3 left-1/2 my-0 mx-auto block w-0 h-0"
        >
            <i class="fas fa-circle-notch fa-spin fa-5x"></i>
        </span>
    </transition>
    <div class="m-14 space-y-8">
        <div class="flex justify-between">
            <div class="space-y-6">
                <h1 class="font-extrabold text-red-500 text-3xl">Todos</h1>
            </div>
            <div class="space-x-5">
                <input
                    v-model="description"
                    type="text"
                    class="inline p-2 hover:transition-all duration-200 rounded focus:outline-none focus:ring-2 text-center focus:ring-red-500 bg-stone-300 placeholder-stone-600"
                    placeholder="New todo"
                />
                <button
                    @click="addItem"
                    :disabled="!description"
                    class="inline p-2 rounded text-white bg-green-500 hover:bg-green-600"
                >Add</button>
            </div>
        </div>

        <div class="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-6">
            <div
                v-for="(todo, i) in todos"
                :key="todo._id"
                class="flex justify-center border-2 border-neutral-800 rounded-xl p-6 bg-transparent"
            >
                <div
                    class="flex max-w-md bg-neutral-800 hover:bg-neutral-700/40 hover:transition-all duration-200 shadow-lg rounded-lg overflow-hidden text-2xl p-8 space-x-4"
                >
                    <div class="w-1/1 h-auto">
                        <span class="text-gray-200">{{ i + 1 }}</span>
                        <span class="text-indigo-500/75">{{ ' • ' }}</span>
                        <textarea
                            v-if="isSelected(todo)"
                            v-model="editedDescription"
                            class="inline p-2 h-auto hover:transition-colors duration-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500 bg-stone-300 placeholder-stone-600"
                        ></textarea>
                        <span v-else class="text-gray-300 h-14">{{ todo.description }}</span>
                    </div>
                    <button
                        @click="isSelected(todo) ? editItem(todo, i) : select(todo)"
                        class="fas text-cyan-400/50 hover:text-cyan-400/80"
                        v-bind:class="{ 'fa-edit': !isSelected(todo), 'fa-save': isSelected(todo) }"
                    ></button>
                    <button
                        @click="isSelected(todo) ? unselect() : removeItem(todo, i)"
                        class="fas text-red-500/50 hover:text-red-500/80"
                        v-bind:class="{ 'fa-trash': !isSelected(todo), 'fa-times-circle': isSelected(todo) }"
                    ></button>
                </div>
            </div>
        </div>

        <button
            @click="$router.push('/')"
            class="p-2 block rounded hover:transition-all duration-200 text-white bg-red-500 hover:bg-red-500/80"
        >Back</button>
    </div>
</template> 


<script>


import axios from 'axios'

let back_server = 'https://vitestack.herokuapp.com';


export default {
    data() {
        return {
            todos: [],
            loading: true,
            description: "",
            editedDescription: "",
            selected: {},
        }
    },
    async created() {
        try {
            const res = await axios.get(
                back_server + '/api/todoListItems/'
            )
            this.loading = false;
            this.todos = res.data


        } catch (e) {
            console.error(e)
        }
    },
    methods: {
        async addItem() {
            const res = await axios.post(
                back_server + '/api/todoListItems/', { description: this.description }
            )
            this.todos.push(res.data);
            this.description = "";
        },
        async removeItem(todo, i) {
            await axios.delete(back_server + '/api/todoListItems/' + todo._id);
            this.todos.splice(i, 1);
        },
        async editItem(todo, i) {
            const res = await axios.put(back_server + '/api/todoListItems/' + todo._id, { description: this.editedDescription });
            this.todos[i] = res.data;
            this.unselect();
        },
        select(todo) {
            this.selected = todo;
            this.editedDescription = todo.description;
        },
        unselect() {
            this.selected = {};
            this.editedDescription = {};
        },
        isSelected(todo) {
            return this.selected._id == todo._id
        }
    }
}



</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>