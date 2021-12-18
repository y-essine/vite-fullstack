<template>
    <transition name="fade">
        <span
            v-if="loading"
            class="text-red-500 opacity-75 fixed top-1/3 left-1/2 my-0 mx-auto block w-0 h-0  "
        >
            <i class="fas fa-circle-notch fa-spin fa-5x"></i>
        </span>
    </transition>
    <div class="m-6 space-y-3.5">
        <h1 class="font-extrabold text-red-500 text-3xl">Products</h1>
        <link rel="stylesheet" href="https://pagecdn.io/lib/font-awesome/5.10.0-11/css/all.min.css" />

        <div class="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-6">
            <div
                v-for="product in products"
                :key="product.id"
                class="flex justify-center text-6xl border-2 border-neutral-800 rounded-xl p-6 bg-transparent"
            >
                <div class="flex max-w-md bg-neutral-800 shadow-lg rounded-lg overflow-hidden">
                    <div
                        class="w-1/3 bg-cover"
                        :style="{ backgroundImage: `url(${product.image})` }"
                    ></div>
                    <div class="w-2/3 p-4">
                        <h1
                            class="text-slate-200 font-bold text-2xl line-clamp-1"
                        >{{ product.title }}</h1>
                        <p class="mt-2 text-gray-300 text-sm line-clamp-4">{{ product.description }}</p>
                        <div class="flex item-center justify-between mt-3">
                            <h1 class="text-red-500 font-bold text-xl">${{ product.price }}</h1>
                            <button
                                class="px-3 py-2 bg-indigo-800 hover:bg-indigo-700 text-white text-xs font-bold uppercase rounded"
                            >Add to Card</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button
            @click="$router.push('/')"
            class="p-2 block rounded text-white bg-red-500 hover:bg-red-400"
        >Back</button>
    </div>
</template> 


<script>

import axios from 'axios'


export default {
    data() {
        return {
            products: [],
            loading: true,
        }
    },
    async created() {
        try {
            const res = await axios.get(
                "https://fakestoreapi.com/products/category/men's%20clothing"
            )
            this.loading = false;
            this.products = res.data


        } catch (e) {
            console.error(e)
        }
    },
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