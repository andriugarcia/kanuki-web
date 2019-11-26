<template lang="pug">
    v-card(color="kred")
        .pa-4 
            .font-weight-bold(style="font-size: 1.8em") Share
            v-list(color="kred")
                v-list-item(@click="shareTo('copy')")
                    v-list-item-avatar
                        v-icon mdi-content-copy
                    v-list-item-title Copy link
                v-list-item(@click="shareTo('whatsapp')")
                    v-list-item-avatar
                        v-icon mdi-whatsapp
                    v-list-item-title Whatsapp
                v-list-item(@click="shareTo('twitter')")
                    v-list-item-avatar
                        v-icon mdi-twitter
                    v-list-item-title Twitter
                v-list-item(@click="shareTo('facebook')")
                    v-list-item-avatar
                        v-icon mdi-facebook
                    v-list-item-title Facebook
        
</template>

<script>
import gql from "graphql-tag"
export default {
    methods: {
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
        },

        shareTo(network) {
            this.increment()

        }
    },

    props: ["card"]
}
</script>
