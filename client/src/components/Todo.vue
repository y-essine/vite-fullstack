<template>
    <div class="flex justify-center border-2 border-neutral-800 rounded-xl p-6 bg-transparent">
        <div
            class="flex max-w-md bg-neutral-800 hover:bg-neutral-700/40 hover:transition-all duration-200 shadow-lg rounded-lg overflow-hidden text-2xl p-8 space-x-4">
            <div class="h-auto">
                <span class="text-gray-200">{{ todo._id + 1 }}</span>
                <span class="text-indigo-500/75">{{ ' • ' }}</span>
                <textarea v-if="isSelected" v-model="editedDescription"
                    class="focus:ring-2 focus:ring-red-500/70"
                ></textarea>
                <span v-else class="text-gray-300 h-14">
                    {{ todo.description }}
                </span>
            </div>
            <button class="text-cyan-400/50 hover:text-cyan-400/80" @click="!isSelected ? select() : edit()">
                <FontAwesomeIcon :icon="!isSelected ? 'edit' : 'save'" fixed-width />
            </button>
            <button class="text-cyan-400/50 hover:text-cyan-400/80" @click="!isSelected ? remove() : unselect()">
                <FontAwesomeIcon :icon="!isSelected ? 'trash' : 'times-circle'" fixed-width />
            </button>
            <!-- <button @click="isSelected(todo) ? editItem(todo, i) : select(todo)"
                class="fas text-cyan-400/50 hover:text-cyan-400/80"
                v-bind:class="{ 'fa-edit': !isSelected(todo), 'fa-save': isSelected(todo) }"></button> -->
            <!-- <button @click="isSelected(todo) ? unselect() : removeItem(todo, i)"
                class="fas text-red-500/50 hover:text-red-500/80"
                v-bind:class="{ 'fa-trash': !isSelected(todo), 'fa-times-circle': isSelected(todo) }"></button> -->
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Todo',
    data: () => ({
        editedDescription: '',
    }),
    created() {
        this.editedDescription = this.todo.description;
    },
    props: {
        todo: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState('todos', ['selectedTodo']),

        isSelected() {
            return this.selectedTodo == this.todo;
        }
    },
    methods: {
        select() {
            this.$emit('select', this.todo);
        },
        unselect() {
            this.$emit('unselect');
        },
        edit() {
            this.$emit('edit', this.todo, this.editedDescription);
        },
        remove() {
            this.$emit('remove', this.todo);
        }
    }
}
</script>