<template>
    <div class="p-12">
        <div class="flex justify-between mb-5">
            <div class="page-title"> {{ currentRoute }} </div>
            <button v-if="!isHome" @click="goTo('Home')" class="btn red">
                Back
            </button>
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
        ...mapActions('routing', ['goTo', 'initRoute']),
    },
    created() {
        this.initRoute();
    }
}
</script>

<style lang="less">
@import "@/styles/global.less";
</style>
