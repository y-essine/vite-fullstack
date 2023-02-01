<template>
    <div class="space-y-3">
        <p>
            Name : {{ name }}
        </p>
        <input
            v-model="newName"
            type="text"
            class="focus:ring-2 focus:ring-red-700 w-48 mr-3"
            placeholder="Name"
        />
        <button @click="saveName" class="btn indigo w-32">Submit</button>
        <div class="space-y-3 w-48">
            <button @click="goTo('About')" class="btn red block w-full">About</button>
            <button @click="goTo('Products')" class="btn cyan block w-full">Products</button>
            <button @click="goTo('Todos')" class="btn orange block w-full">Todos</button>
        </div>
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
        ...mapActions('routing', ['goTo']),

        saveName() {
            if (this.newName.trim() != '' && this.newName.match(/^[a-zA-Z0-9 ]+$/)) {
                this.setName(this.newName)
                this.newName = '';
                this.$notify({ type: 'success', title: 'Done!', text: 'Name is updated.' })
            } else {
                this.$notify({
                    type: 'error',
                    title: 'Missing information!',
                    text: 'Please enter an valid name.',
                })
            }
        }
    },
}
</script>