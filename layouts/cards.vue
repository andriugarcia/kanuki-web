<template lang="pug">
    #published.mt-4
        post(v-for="(card, i) in cards", :key="i", :card="card", @click="$emit('back')")
</template>

<script>

import gql from "graphql-tag"
import Post from "@/components/Post"

export default {

    components: {
        Post
    },

    computed: {
        cards() {
            return this.$store.state.auth.user.cards
        }
    },

    async mounted() {
      let {data} = await this.$apollo.query({
        query: gql`query {
          getUser(name: "andres") {
            cards {
                name,
                title,
                karma,
                type,
                shareCount,
                commentsCount,
                content,
                author {
                    name, avatar
                }
                
            }
          }
        }`
      })

      this.$store.commit("auth/mergeUser", data.getUser)
    }

}
</script>