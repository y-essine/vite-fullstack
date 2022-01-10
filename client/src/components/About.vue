<template>
    <div class="m-6 space-y-3.5">
        <div class="flex justify-between">
            <h1 class="p-2 font-extrabold text-red-500 text-3xl">About</h1>
            <button
                @click="$router.push('/')"
                class="p-2 block rounded text-white bg-red-500 hover:bg-red-500/80"
            >Back</button>
        </div>
        <p class="text-slate-300">The person named {{ name }} is...</p>
    </div>
</template>


<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const name = computed(() => {
    return store.state.user.name
})

</script>