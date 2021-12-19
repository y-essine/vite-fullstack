<template>
    <div class="m-6 space-y-3.5">
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
