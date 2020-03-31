<template lang="pug">
    v-list(color="transparent")
        v-list-item(v-for="(follower, i) in followers", :key="i", @click="toUser(follower)")
            v-list-item-avatar
                v-avatar(size="32")
                    v-img(:src="follower.avatar")
            v-list-item-title.font-weight-bold(style="font-size: .8em") u/{{follower.name}}
            follow(:name="follower.name", :isUser="true")
</template>

<script>

import Follow from "@/components/Follow"

export default {

    components: {
        Follow
    },

    computed: {
        followers() {
            return this.$store.state.auth.user.following
        }
    },

    methods: {
        toUser(follower) {
            this.$router.push({path: '/u/' + follower.name})
            this.$emit('back')
        }
    }

}
</script>