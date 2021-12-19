<template>
    <div class="m-6 space-y-3.5">
<<<<<<< HEAD
        <div class="flex justify-between">
            <h1 class="font-extrabold text-red-500 text-3xl">Home</h1>
            <div class="flex-col flex items-center">
                <h1 class="font-extrabold text-indigo-500 text-3xl">{{ user.username }}</h1>
                <h1 class="font-bold text-indigo-500/40">{{ user.email }}</h1>
            </div>
        </div>
        <div>
            <button
                class="rounded bg-cyan-700 hover:bg-cyan-700/75 p-3 mt-5 text-slate-300"
                @click="logout"
            >Logout</button>
        </div>
=======
        <h1 class="font-extrabold text-red-500 text-3xl">Home</h1>
        <p class="text-slate-300">Name : {{ name }}</p>
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
>>>>>>> 63bd4f5b655bd4e3e9eee93e97ff8bc969c4661c
    </div>
</template> 

<script >

import axios from 'axios';

import { notify } from '@kyvg/vue3-notification';

let online = false;

let serv = online ? '' : 'http://localhost:3000';

export default {
    name: 'Home',
    data() {
        return {
            user: {}
        }
    },
    created() {
        //used not auth
        if (localStorage.getItem('auth_token') === null) {
            this.$notify({ type: 'error', title: 'No login!', text: "Please log in first." });
            this.$router.push('/login');
        }
    },
    mounted() {
        axios.get(serv + '/api/users/user', { headers: { token: localStorage.getItem('auth_token') } })
            .then(res => {
                this.user = res.data.user;
            })
    },
    methods: {
        logout() {
            this.$notify({ type: 'warning', title: 'Logged out', text: "Logged out successfully." });
            this.$router.push('/login');
            localStorage.clear();
        }
    }
}
</script>
