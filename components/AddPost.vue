<template lang="pug">
    #AddPost(v-if="!newPost")
        v-layout(align-center)
            v-btn(icon, @click="$emit('back')")
                v-icon mdi-arrow-left
            .overline.ml-2.uns New Post at <b style="letter-spacing: 0">p/{{$route.params.pill}}</b>
        v-list(color="transparent", style="overflow-y: scroll; max-height: 100vh")
            v-list-item(@click="newPost = true")
                v-list-item-avatar
                    v-avatar(color="kblue")
                        v-icon.white--text mdi-plus
                v-list-item-title Nuevo Post
            v-list-item(v-for="(card, i) in cards", :key="i", two-line, @click="spread(card)")
                v-list-item-content
                    v-list-item-title.uns {{card.title}}
                    v-list-item-subtitle.uns {{card.description}}
                v-list-item-action
                    v-chip.font-weight-bold.uns(small, color="kyellow") {{card.karma}}
    create-post(v-else, @back="newPost = false")
</template>

<script>

import gql from 'graphql-tag'

export default {
    components: {
        CreatePost: () => import("@/components/CreatePost")
    },

    data() {
        return {
            newPost: false
        }
    },

    computed: {
        cards() {
            console.log(this.$store.state.auth.user.cards)
            return this.$store.state.auth.user.cards
        }
    },

    methods: {
        async spread(card) {
            let {data} = await this.$apollo.mutate({
                mutation: gql`mutation CreatePublication($name: String!, $author: String!, $pill: String!) {
                    createPublication(cardName: $name, cardAuthor: $author, pill: $pill) {
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
                }`,
                variables: {
                    name: card.name,
                    author: card.author.name,
                    pill: this.$route.params.pill
                }
            })

            this.$router.push({path: `/p/${this.$route.params.pill}/${data.createPublication.card.author.name}/${data.createPublication.card.name}`})
        },
    }
}
</script>