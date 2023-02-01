<template>
    <div
        class="flex justify-center border-2 border-neutral-800 rounded-xl p-6 bg-transparent"
    >
        <div
            class="flex max-w-md bg-neutral-800 hover:bg-neutral-700/40 hover:transition-all duration-200 shadow-lg rounded-lg overflow-hidden text-2xl p-8 space-x-4"
        >
            <div class="h-auto">
                <span class="text-gray-200">{{ index + 1 }}</span>
                <span class="text-indigo-500/75">{{ ' • ' }}</span>
                <textarea
                    v-if="isSelected"
                    v-model="editedDescription"
                    class="focus:ring-2 focus:ring-red-500/70"
                ></textarea>
                <span v-else class="text-gray-300 h-14">
                    {{ todo.description }}
                </span>
            </div>
            <button
                class="text-cyan-400/50 hover:text-cyan-400/80"
                @click="!isSelected ? select() : edit()"
            >
                <FontAwesomeIcon
                    :icon="!isSelected ? 'edit' : 'save'"
                    fixed-width
                />
            </button>
            <button
                class="text-cyan-400/50 hover:text-cyan-400/80"
                @click="!isSelected ? remove() : unselect()"
            >
                <FontAwesomeIcon
                    :icon="!isSelected ? 'trash' : 'times-circle'"
                    fixed-width
                />
            </button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Todo',
    data: () => ({
        editedDescription: '',
    }),
    created() {
        this.editedDescription = this.todo.description
    },
    props: {
        todo: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },
    computed: {
        ...mapState('todos', [
            'selectedTodo',
            'isLoading',
            'isLoaded',
            'isEditing',
        ]),

        isSelected() {
            return this.selectedTodo == this.todo
        },
        disabledState() {
            return (
                this.isLoading ||
                !this.isLoaded ||
                this.isEditing ||
                this.editedDescription.trim().length === 0 ||
                this.editedDescription.trim().length > 30
            )
        },
    },
    methods: {
        select() {
            this.$emit('select', this.todo)
        },
        unselect() {
            this.$emit('unselect')
        },
        edit() {
            if (this.disabledState)
                return this.$notify({
                    title: 'Error',
                    text: 'Todo description must be between 1 and 30 characters',
                    type: 'error',
                })
            this.$emit('edit', {
                _id: this.todo._id,
                description: this.editedDescription.trim(),
            })
        },
        remove() {
            this.$emit('remove', this.todo)
        },
    },
}
</script>
