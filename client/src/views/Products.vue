<template>
    <transition name="fade">
        <Spinner v-if="isLoading" />
    </transition>

    <div v-if="(!isLoading && isLoaded)" class="flex flex-wrap justify-center gap-6">
        <Product v-for="product in products" :key="product.id" :product="product" />
    </div>
</template> 


<script>
import { mapState, mapActions } from 'vuex';

import Product from '@/components/Product.vue';
import Spinner from '@/components/utils/Spinner.vue';

export default {
    name: 'Products',
    components: {
        Product,
        Spinner,
    },
    computed: {
        ...mapState('products', ['products', 'isLoading', 'isLoaded']),
    },
    methods: {
        ...mapActions('products', ['fetchProducts']),
    },
    mounted() {
        this.fetchProducts("men's%20clothing");
    },
}
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>