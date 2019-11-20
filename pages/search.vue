<template lang="pug">
    #Pill
        #mobile(v-if="!$vuetify.breakpoint.mdAndUp")
            .pa-6
                h1 Buscar.
                v-text-field.my-3(solo, hide-details, placeholder="Buscar")
                v-layout.mt-3(flex)
                    v-btn(text, color="kred")
                        .font-weight-bold.text-capitalize Todo
                    v-btn(text)
                        v-icon mdi-pill
                        .font-weight-bold.text-capitalize Pills
                    v-btn(text)
                        v-icon mdi-cards
                        .font-weight-bold.text-capitalize Cards
                    v-btn(text)
                        v-icon mdi-account
                        .font-weight-bold.text-capitalize Users
            div(v-for="(post, i) in posts", :key="i")
                post(v-if="post.__typename == 'Card'", :card="post")
                v-card.mb-7(v-else, style="border-radius: 24px", dark, :color="post.__typename == 'Pill' ? 'kred' : 'kblue'")
                    v-layout(align-center)
                        v-avatar(:size="32")
                            v-img(:src="post.__typename == 'Pill' ? post.avatar : post.author.avatar")
                        .font-weight-bold.ml-2(style="font-size: .8em") {{`${post.__typename == 'Pill' ? 'p/' : 'u/'}${post.name}`}}
                        v-spacer
                        follow(:name="post.name", :isUser="post.__typename == 'User'")        
        #desktop(v-else)
            v-layout(style="padding-top: 72px")
                v-flex(xs8)
                    h1 Resultados de {{$route.params.search}}
                    masonry.mt-4(:cols="{default: 2, 960: 1}")
                        div(v-for="(post, i) in postsComputed", :key="i")
                            post(v-if="post.__typename == 'Card'", :card="post")
                            v-card.mb-7(v-else, style="border-radius: 24px", dark, :color="post.__typename == 'Pill' ? 'kred' : 'kblue'", @click="toPillOrCard(post)")
                                v-layout(align-center)
                                    v-avatar(:size="32")
                                        v-img(:src="post.__typename == 'Pill' ? post.avatar : post.author.avatar")
                                    .font-weight-bold.ml-2(style="font-size: .8em") {{`${post.__typename == 'Pill' ? 'p/' : 'u/'}${post.name}`}}
                                    v-spacer
                                    follow(:name="post.name", :isUser="post.__typename == 'User'")
                v-flex(xs4)
                    v-layout.mt-3(flex)
                        v-btn(text, :color="filter == '' ? 'kred' : 'black'", @click="filter = ''")
                            .font-weight-bold.text-capitalize Todo
                        v-btn(text, :color="filter == 'Pill' ? 'kred' : 'black'", @click="filter = 'Pill'")
                            v-icon mdi-pill
                            .font-weight-bold.text-capitalize Pills
                        v-btn(text, :color="filter == 'Card' ? 'kred' : 'black'", @click="filter = 'Card'")
                            v-icon mdi-cards
                            .font-weight-bold.text-capitalize Cards
                        v-btn(text, :color="filter == 'User' ? 'kred' : 'black'", @click="filter = 'User'")
                            v-icon mdi-account
                            .font-weight-bold.text-capitalize Users
                    

</template>

<script>
import Follow from "@/components/Follow"
import Post from "@/components/Post"
import gql from "graphql-tag"

export default {
    async asyncData({params, app}) {
        let client = app.apolloProvider.defaultClient

        let {data} = await client.query({
            query: gql`query Search($text: String!) {
                search(text: $text) {
                    __typename,
                    ...on Card {
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
                    ...on Pill {
                        name,
                        avatar
                    }
                    ...on User {
                        name,
                        avatar
                    }
                }
            }`,
            variables: {
                text: params.search
            }
        })

        console.log(data)

        return {
            posts: data.search
        }
    },

    components: {
        Follow,
        Post
    },

    computed: {
        postsComputed() {
            return this.posts.filter(post => {
                return this.filter == "" || this.filter == post.__typename
            })
        }
    },

    data() {
        return {
            posts: [],
            filter: ""
        }
    },

    methods: {
        toPillOrCard(post) {
            let letter = post.__typename == 'Pill' ? 'p' : 'u'
            this.$router.push({path: `/${letter}/${post.name}`})
        }
    }
}
</script>