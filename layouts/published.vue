<template lang="pug">
    #published.mt-4
        post(v-for="(publication, i) in publications", :key="i", :card="publication.card", :pill="publication.pill.name")
</template>

<script>

import Follow from "@/components/Follow"
import gql from "graphql-tag"
import Post from "@/components/Post"

export default {

    components: {
        Follow,
        Post
    },

    computed: {
        publications() {
            return this.$store.state.auth.user.publications
        }
    },

    async mounted() {
      let {data} = await this.$apollo.query({
        query: gql`query {
          getUser(name: "andres") {
            publications {
                pill {
                    name
                },
                card {
                    name,
                    title,
                    karma,
                    type,
                    shareCount,
                    commentsCount,
                    content,
                    author {
                        name
                    }
                }
            }
          }
        }`
      })

      this.$store.commit("auth/mergeUser", data.getUser)
    }

}
</script>