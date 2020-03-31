<template lang="pug">
    #Karma
        v-card.pa-1(color="kyellow", flat)
            v-layout(justify-space-around, align-center)
                v-btn(small, icon, :color="prop.vote == 'down' ? 'kblue': 'black'", @click.stop="vote('down')")
                    v-icon mdi-minus
                .font-weight-bold.mx-2.uns {{prop.karma}}
                v-btn(small, icon, :color="prop.vote == 'up' ? 'kred': 'black'", @click.stop="vote('up')")
                    v-icon mdi-plus
</template>

<script>

import gql from "graphql-tag"

export default {

    methods: {
        async vote(voting) {
            if (!this.$store.state.auth.logged) {
                this.$store.commit('core/setOpenAccountPopup', true)
                return
            }
            if (this.prop.vote == voting) {
                voting = 'no'
            }
            if (typeof this.card != 'undefined') {
                let {data} = await this.$apollo.mutate({
                    mutation: gql`mutation UpdateCardKarma($card: String!, $cardAuthor: String!, $vote: Vote!) {
                        updateCardKarma(card: $card, cardAuthor: $cardAuthor, vote: $vote) {
                            karma, vote
                        }
                    }`,
                    variables: {
                        card: this.card.name,
                        cardAuthor: this.card.author.name,
                        vote: voting
                    }
                })
    
                this.card.karma = data.updateCardKarma.karma
                this.card.vote = data.updateCardKarma.vote
            }

            else {
                console.log(this.comment)
                let {data} = await this.$apollo.mutate({
                    mutation: gql`mutation UpdateCommentKarma($id: String!, $vote: Vote!) {
                        updateCommentKarma(id: $id, vote: $vote) {
                            karma, vote
                        }
                    }`,
                    variables: {
                        id: this.comment.id,
                        vote: voting
                    }
                })
    
                this.comment.karma = data.updateCommentKarma.karma
                this.comment.vote = data.updateCommentKarma.vote

            }
        }
    },

    computed: {
        prop() {
            return typeof this.card != 'undefined' ? this.card : this.comment
        },

        openAccountPopup() {
            return this.$store.commit('core/setOpenAccountPopup', true)
        }
    },

    props: ["card", "comment"]
}
</script>