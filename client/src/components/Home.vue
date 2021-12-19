<template>
    <div class="m-6 space-y-3.5">
        <h1 class="font-extrabold text-red-500 text-3xl">Home</h1>
        <p class="text-slate-300">Mothafucka name : {{ name }}</p>
        <input
            v-model="newName"
            type="text"
            class="p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 bg-stone-300"
            placeholder="Name"
        />
        <button
            @click="saveName"
            class="p-2 ml-5 rounded text-white bg-indigo-600 hover:bg-indigo-700 bg-clip-padding"
        >Submit</button>

        <button
            @click="$router.push('/about')"
            class="p-2 block rounded text-white bg-red-500 hover:bg-red-500/80"
        >About</button>

        <button
            @click="$router.push('/products')"
            class="p-2 block rounded text-white bg-cyan-700 hover:bg-cyan-800"
        >Products</button>
        <button
            @click="$router.push('/todos')"
            class="p-2 block rounded text-white bg-orange-500 hover:bg-orange-600"
        >Todos</button>
    </div>
</template> 

<script setup>
import { computed, ref } from 'vue'

import { useStore } from 'vuex'

const store = useStore()


import { notify } from '@kyvg/vue3-notification'

const name = computed(() => {
    return store.state.user.name
})

const newName = ref('')

function saveName() {
    if (newName.value != '') {
        store.dispatch('saveName', newName.value)
        newName.value = ''
        notify({ type: 'success', title: 'Done!', text: 'Name is saved.' })
    } else
        notify({
            type: 'error',
            title: 'Missing information!',
            text: 'Please enter a name.',
        })
}

</script>