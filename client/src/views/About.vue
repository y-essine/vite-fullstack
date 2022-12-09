<template>
    <div>
        <p>
            Hi {{ name }}, I hope you're having a great day!
        </p>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'About',
    computed: {
        ...mapState('user', ['name'])
    },
}
</script>