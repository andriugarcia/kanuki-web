<template lang="pug">
    v-layout.mt-5(wrap)
        v-flex(xs12, md8)
            v-layout.ma-3(v-if="user", align-center)
                v-avatar
                    v-img(:src="user.avatar")
                .font-weight-bold.ml-2 u/{{user.name}}
                v-spacer
                v-btn(icon, color="kred")
                    v-icon mdi-magnify
            masonry.mt-4(:cols="{default: 2, 960: 1}")
                post(v-for="(post, i) in timeline", :key="i", :card="post.card || post", :pill="post.pill.name")
        v-flex(xs12, md4)
</template>

<script>
import Post from "@/components/Post"
import gql from "graphql-tag"

export default {
    async asyncData({app, store}) {
        let client = app.apolloProvider.defaultClient

        let {data} = await client.query({
            query: gql`query {
                timeline {
                    __typename
                    ...on Publication {
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
                                name,
                                avatar
                            }
                        }
                    }
                    ...on Card {
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
            }`
        })

        return {
            timeline: data.timeline
        }
    },

    components: {
        Post
    },

    computed: {
        user() {
            return this.$store.state.auth.user
        }
    },

    data() {
        return {}
    }
}
</script>