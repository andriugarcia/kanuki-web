<template lang="pug">
    #bottomPostBar
        v-layout(justify-space-around)
            v-flex(xs3)
                v-btn(text, @click.stop="$emit('comments')")
                    .mr-1.uns {{card.commentsCount}}
                    v-icon mdi-comment
            v-flex(xs5)
                karma(:card="card")
            v-flex(xs3)
                v-btn(text, @click.stop="shareDialog = true")
                    .mr-1.uns {{card.shareCount}}
                    v-icon mdi-share-variant
        #share
            v-dialog(v-model="shareDialog", v-if="$vuetify.breakpoint.mdAndUp", width="500", @back="shareDialog = false")
                share(:card="card")
            v-bottom-sheet(v-else, v-model="shareDialog", @back="shareDialog = false")
                share(:card="card")
</template>

<script>
import Karma from "@/components/Karma"
import gql from "graphql-tag"

export default {
    components: {
        Karma,
        Share: () => import("@/components/Share"),
    },


    data() {
        return {
            shareDialog: false

        }
    },

    methods: {
        share() {
            if (typeof navigator.share === 'undefined') {
                this.shareDialog = true
            }

            else {
                this.increment()
                navigator.share({
                    title: document.title,
                    text: this.clothing.Description,
                    url: window.location.href
                });
            }
        },

        increment() {
            this.$apollo.mutate({
                mutation: gql`mutation IncrementShareCount($card: String!, $cardAuthor: String!) {
                    incrementShareCount(card: $card, cardAuthor: $cardAuthor) {
                        name
                    }
                }`,
                variables: {
                    card: this.card.name,
                    cardAuthor: this.card.author.name
                }
            })
            this.card.shareCount++
        }
    },

    props: ["card"]
}
</script>