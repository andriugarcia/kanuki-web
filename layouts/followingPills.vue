<template lang="pug">
    v-list(color="transparent")
        v-list-item(v-for="(pill, i) in pills", :key="i", @click="toPill(pill)")
            v-list-item-avatar
                v-avatar(size="32", color="indigo")
                    v-img(:src="pill.avatar")
            v-list-item-title.font-weight-bold(style="font-size: .8em") p/{{pill.name}}
            follow(:name="pill.name")
</template>

<script>

import Follow from "@/components/Follow"

export default {

    components: {
        Follow
    },

    computed: {
        pills() {
            return this.$store.state.auth.user.followingPills
        }
    },

    methods: {
        toPill(pill) {
            this.$router.push({path: '/p/' + pill.name})
            this.$emit('back')
        }
    }

}
</script>