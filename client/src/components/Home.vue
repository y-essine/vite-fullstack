<template>
    <div class="m-6 space-y-3.5">
        <h1 class="font-extrabold text-red-500 text-3xl">Home</h1>
        <p class="text-slate-300">Name : {{ name }}</p>
        <input v-model="newName" type="text"
            class="p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 bg-stone-300 text-neutral-600"
            placeholder="Name" />
        <button @click="saveName"
            class="p-2 ml-5 rounded text-white bg-indigo-600 hover:bg-indigo-700 bg-clip-padding">Submit</button>

        <button @click="$router.push('/about')"
            class="p-2 block rounded text-white bg-red-500 hover:bg-red-500/80">About</button>

        <button @click="$router.push('/products')"
            class="p-2 block rounded text-white bg-cyan-700 hover:bg-cyan-800">Products</button>
        <button @click="$router.push('/todos')"
            class="p-2 block rounded text-white bg-orange-500 hover:bg-orange-600">Todos</button>
    </div>
</template> 

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'Home',
    data:
        () => ({
            newName: '',
        })
    ,
    computed: {
        ...mapState('user', ['name']),
    },
    methods: {
        ...mapActions('user', ['setName']),

        saveName() {
            if (this.newName.trim() != '' && this.newName.match(/^[a-zA-Z0-9]+$/)) {
                this.setName(this.newName)
                this.newName = '';
                this.$notify({ type: 'success', title: 'Done!', text: 'Name is updated.' })
            } else {
                this.$notify({
                    type: 'error',
                    title: 'Missing information!',
                    text: 'Please enter an alphanumeric name.',
                })
            }
        }
    },
}
</script>