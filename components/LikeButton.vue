<template lang="pug">
    #likeButton
        v-btn(fab, color="kred", dark, @click.stop="like")
            v-icon {{ isLiked ? 'mdi-bookmark' : 'mdi-bookmark-outline'}}
</template>

<script>

import gql from "graphql-tag"

export default {
    computed: {
        likes() {
            return this.$store.state.auth.user.likes
        },

        isLiked() {
            if (!this.likes) return false
            return this.likes.some(like => like.name == this.name)
        },

        openAccountPopup() {
            return this.$store.state.core.openAccountPopup
        }
    },

    methods: {
        async like() {
            if (!this.$store.state.auth.logged) {
                this.$store.commit('core/setOpenAccountPopup', true)
                return
            }

            let mutation
            if (this.isLiked) {
                mutation = gql`mutation RemoveLike($name: String!, $author: String!) {
                    removeLike(name: $name, author: $author) {
                        likes {
                            name,
                            author {
                                name
                            }
                        }
                    }
                }`
            }
            else {
                mutation = gql`mutation Like($name: String!, $author: String!) {
                    like(name: $name, author: $author) {
                        likes {
                            name,
                            author {
                                name
                            }
                        }
                    }
                }`
            }

            let {data} = await this.$apollo.mutate({
                mutation,
                variables: {
                    name: this.name,
                    author: this.author
                }
            })

            this.$store.state.auth.user.likes = this.isLiked ? data.removeLike.likes : data.like.likes

            

        }
    },

    props: ["name", "author", "pill"]
}
</script>

