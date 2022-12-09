<template>
    <div class="p-12 space-y-3.5">
        <div class="flex justify-between">
            <div class="page-title"> {{ currentRoute }} </div>
            <div v-if="!isHome" @click="goTo('Home')" class="btn bg-red-500 hover:bg-red-500/80">
                Back
            </div>
        </div>
        <router-view />
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
    name: 'Main',
    computed: {
        ...mapState('routing', ['currentRoute']),
        ...mapGetters('routing', ['isHome'])
    },
    methods: {
        ...mapActions('routing', ['goTo']),
    },
}
</script>

<style lang="less">
@import "@/styles/global.less";
</style>
