<template>
    <link rel="stylesheet" href="https://pagecdn.io/lib/font-awesome/5.10.0-11/css/all.min.css" />
    <div class="space-y-10">
        <div class="flex justify-center m-6">
            <h1 class="font-extrabold text-red-500 text-3xl">Login</h1>
        </div>

        <div class="form flex-col flex items-center space-y-5 text-stone-300 font-bold">
            <div>
                <button
                    class="rounded bg-red-500 hover:bg-red-500/75 p-3 mt-5"
                    @click="$router.push('/')"
                >Home</button>
            </div>
            <div>
                <button
                    class="rounded bg-indigo-500 hover:bg-indigo-500/75 p-3 mt-5"
                    @click="$router.push('/signup')"
                >Register</button>
            </div>

            <div class="space-y-3">
                <h4 class="block">Username:</h4>
                <input
                    type="username"
                    name="username"
                    placeholder="Username"
                    class="block rounded focus:outline-none text-neutral-800 bg-stone-400 p-4 placeholder:text-stone-600"
                    autocomplete="off"
                    v-model="username"
                />
            </div>
            <div class="space-y-3">
                <h4 class="block">Password:</h4>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    class="block rounded focus:outline-none text-neutral-800 bg-stone-400 p-4 placeholder:text-stone-600"
                    autocomplete="off"
                    v-model="password"
                />
            </div>
            <div>
                <button
                    @click="processUserInfo"
                    class="rounded bg-cyan-700 hover:bg-cyan-700/75 p-3 mt-5"
                >Submit</button>
            </div>

            <span v-if="loading" class="text-red-500 opacity-75 !mt-12">
                <i class="fas fa-circle-notch fa-spin fa-5x"></i>
            </span>
        </div>
    </div>
</template> 

<script>

import axios from 'axios';

import { useRouter } from 'vue-router';

const router = useRouter();

import { notify } from '@kyvg/vue3-notification';

let online = false;

let serv = online ? '' : 'http://localhost:3000';


export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            loading: false,
        }
    },
    methods: {
        async login() {
            this.loading = true;

            let user = {
                username: this.username,
                password: this.password
            }

            const res = await axios.post(serv + '/api/users/login', user)
                .then(res => {
                    if (res.status == 201) {
                        this.$notify({ type: 'error', title: 'Error!', text: "Invalid credentials..." });
                        return;
                    }
                    this.$notify({
                        clean: true
                    })
                    
                    this.$notify({ type: 'success', title: 'Sucess!', text: 'User logged in.' });
                    localStorage.setItem('auth_token', res.data.token);
                    this.$router.push('/');
                    return;

                }, err => {
                    this.$notify({ type: 'error', title: 'Error!', text: "Trouble logging in..." });
                });


            this.loading = false;
        },
        reset() {
            this.password = "";
        },
        validate() {
            if (this.username == '' || this.password == '')
                return false;
            return true;
        },
        processUserInfo() {
            if (this.validate()) {
                this.login();
                this.reset();
                return;
            }
            this.$notify({ type: 'error', title: 'Error!', text: "Please make sure to fill up the forms!" });
        }
    }
}
</script>

<style>
</style>