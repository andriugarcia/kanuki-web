<template lang="pug">
    #Comments
        .font-weight-bold.mt-5.ml-3 {{card.comments.length}} Comentarios
        v-card.mt-5(v-if="$vuetify.breakpoint.mdAndUp", style="border-radius: 24px")
            v-textarea.pb-3(v-model="text", solo, flat, auto-grow, hide-details, rows="1", :placeholder="replying ? `Contestando a u/${replyingComment.author.name}` : 'Escribe tu comentario...'")
                v-badge.mr-3(slot="append-outer", left, overlap, color="transparent")
                    template(v-if="replying", slot="badge")
                        v-avatar(:size="24")
                            v-img(:src="replyingComment.author.avatar")
                    v-btn(fab, :loading="loading", dark, small, color="kblue", @click="addComment")
                        v-icon(small) mdi-send
                v-btn(v-if="replying", small, icon, slot="append", @click="unReply") 
                    v-icon mdi-close
        comment(v-for="(comment, i) in card.comments", :key="i", :comment="comment", @reply="replay(comment)")
        v-textarea(v-if="!$vuetify.breakpoint.mdAndUp",v-model="text",  solo, flat, auto-grow, hide-details, rows="1", :placeholder="replying ? `Contestando a u/${replyingComment.author.name}` : 'Escribe tu comentario...'", style="position: fixed; bottom: 0; left: 0; right: 0")
            v-btn(v-if="replying", slot="append", icon, @click="unReply") 
                v-icon mdi-close
            v-btn(slot="append-outer", fab, :loading="loading", dark, small, color="kblue", @click="addComment")
                v-icon(small) mdi-send
</template>

<script>
import Comment from "@/components/Comment"
import gql from "graphql-tag"

export default {
    components: {
        Comment
    },

    data() {
        return {
            text: "",
            replying: false,
            loading: false
        }
    },

    methods: {
        replay(comment) {
            this.replying = true
            console.log(comment)
            this.replyingComment = comment
        },

        unReply() {
            this.replyingComment = {}
            this.replying = false
        },

        async addComment() {
            this.loading = true
            // if (this.replying) {
            //     this.addSubComment()
            // }
            let {data} = await this.$apollo.mutate({
                mutation: gql`mutation AddComment($card: String!, $cardAuthor: String!, $father: String, $pill: String, $text: String!) {
                    addComment(card: $card, cardAuthor: $cardAuthor, pill: $pill, text: $text, father: $father) {
                        id,
                        text,
                        author {
                            name
                        },
                        pill {
                            name
                        },
                        card {
                            name
                        }
                    }
                }`,
                variables: {
                    card: this.card.name,
                    cardAuthor: this.card.author.name,
                    pill: this.pill,
                    text: this.text,
                    father: this.replyingComment.id
                }
            })

            console.log(`Adding comment ${this.pill}`)

            this.loading = false
            this.card.comments.unshift(data.addComment)
        }
    },

    props: ["card", "pill"]
}
</script>