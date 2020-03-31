<template lang="pug">
  #likes
    v-progress-circular(v-if="loading", indeterminate, color="blue")
    div(v-else)
      post(v-for="(card, i) in likes", :key="i", :card="card", @click="$emit('back')")
</template>

<script>

import Post from "@/components/Post"
import gql from "graphql-tag"

export default {
    components: {
        Post
    },

    computed: {
        likes() {
            return this.$store.state.auth.user.likes
        }
    },

    data() {
      return {
        loading: true
      }
    },

    async mounted() {
      this.loading = true
      let {data} = await this.$apollo.query({
        query: gql`query {
          getUser(name: "andres") {
            likes {
                name,
                title,
                karma,
                type,
                shareCount,
                commentsCount,
                content,
                author {
                    name,
                    avatar
                }
            }
          }
        }`
      })

      console.log(data.getUser.likes)
      this.$store.state.auth.user.likes = data.getUser.likes
      this.loading = false
    }
}

</script>