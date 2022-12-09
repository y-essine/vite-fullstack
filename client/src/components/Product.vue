<template>
    <div class="flex justify-center text-6xl border-2 border-neutral-800 rounded-xl p-6 bg-transparent">
        <div class="flex max-w-md bg-neutral-800 shadow-lg rounded-lg overflow-hidden">
            <div class="w-1/3 bg-cover" :style="{ backgroundImage: `url(${product.image})` }"></div>
            <div class="w-2/3 p-4">
                <h1 class="text-slate-200 font-bold text-2xl line-clamp-1">
                    {{ product.title }}
                </h1>
                <p class="mt-2 text-gray-300 text-sm line-clamp-4">
                    {{ product.description }}
                </p>
                <div class="xs:block sm:flex item-center justify-between xs:mt-1 sm:mt-3 text-xl">
                    <h1 class="text-red-500 font-bold text-xl">
                        ${{ product.price }}
                    </h1>
                    <button
                        class="px-3 py-2 bg-indigo-800 hover:bg-indigo-700 text-white text-xs font-bold uppercase rounded">
                        Add to Card
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Product',
    props: {
        product: {
            type: Object,
            required: true
        }
    }
}
</script>