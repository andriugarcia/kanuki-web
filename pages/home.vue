<template lang="pug">
    v-layout.mt-5(v-if="timeline.length != 0", wrap)
        v-flex(xs12, md8)
            v-layout.ma-3(v-if="user", align-center)
                v-avatar
                    v-img(:src="user.avatar")
                .font-weight-bold u/{{user.name}}
                v-spacer
                v-btn(text, rounded, color="kred", @click="$router.push({path: '/s'})")
                    v-icon mdi-compass-outline
                    .font-weight-bold.text-capitalize.ml-1(style="letter-spacing: 0") Descubre
            masonry(:cols="{default: 2, 960: 1}")
                post(v-for="(post, i) in timeline", :key="i", :card="post.card || post", :pill="post.pill")
        v-flex.px-2(xs12, md4, style="padding-top: 72px;")
            main-column
</template>

<script>
import Post from "@/components/Post"
import gql from "graphql-tag"

export default {
    data() {
        return {
            timeline: [],
            hotPills: []
        }
    },
    async asyncData({store, app}) {
        let client = app.apolloProvider.defaultClient
        let timeline
        try {
            let {data} = await client.query({
                query: gql`query {
                    timeline {
                        __typename
                        ...on Publication {
                            pill {
                                name, avatar
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
                                name, avatar
                            }
                        }
                    }
                }`
            })
            timeline = data.timeline
        }

        catch(err) {
            console.error(err)
            timeline = []
        }

        return {timeline}

    },

    async beforeMount() {
        let client = this.$apollo

        let {data} = await client.query({
                query: gql`query {
                    getTopPills(page: 0, limit: 6) {
                        name,
                        avatar
                    }
                }`
            })
            this.hotPills = data.getHotPills
    },

    components: {
        Post,
        MainColumn: () => import("@/components/MainColumn")
    },

    computed: {
        user() {
            return this.$store.state.auth.user
        }
    }
}
</script>