<template lang="pug">
    #Comments
        .font-weight-bold.my-5.ml-3 {{card.comments.length}} Comentarios
        v-card.mb-2(v-if="replying", flat, color="grey lighten-2")
            .pa-1.pl-2(style="border-left: 2px solid #ED5261")
                .font-weight-bold.hover(style="font-size: .8em") u/{{replyingComment.author.name}}
                div(style="font-size: .8em") {{replyingComment.text}}
        v-card(v-if="$vuetify.breakpoint.mdAndUp", style="border-radius: 24px")
            v-textarea.pb-3(v-model="text", solo, flat, auto-grow, hide-details, rows="1", :placeholder="replying ? `Contestando a u/${replyingComment.author.name}` : 'Escribe tu comentario...'")
                v-badge.mr-3(slot="append-outer", left, overlap, color="transparent")
                    template(v-if="replying", slot="badge")
                        v-avatar(:size="24")
                            v-img(:src="replyingComment.author.avatar")
                    v-btn(fab, :loading="loading", dark, small, color="kblue", @click="addComment")
                        v-icon(small) mdi-send
                v-btn(v-if="replying", small, icon, slot="append", @click="unReply") 
                    v-icon mdi-close
        comment(v-for="(comment, i) in card.comments", :key="i", :comment="comment", :n="0", @reply="replay")
        v-textarea.pa-1(v-if="!$vuetify.breakpoint.mdAndUp",v-model="text",  solo, flat, auto-grow, hide-details, rows="1", :placeholder="replying ? `Contestando a u/${replyingComment.author.name}` : 'Escribe tu comentario...'", style="position: fixed; bottom: 0; left: 0; right: 0")
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
            replyingComment: {},
            loading: false
        }
    },

    mounted() {
        console.log(this.card.comments)
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

        async addSubComment() {
            console.log(this.replyingComment)
            let {data} = await this.$apollo.mutate({
                mutation: gql`mutation AddComment($card: String!, $cardAuthor: String!, $father: String, $pill: String, $text: String!) {
                    addComment(card: $card, cardAuthor: $cardAuthor, pill: $pill, text: $text, father: $father) {
                        id,
                        text,
                        karma
                        author {
                            name, avatar
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



            // const index = this.card.comments.findIndex((comment) => {
            //     return comment.id == this.replyingComment.id
            // })

            // this.card.comments[index].subComments.unshift(data.addComment)
        },

        async addComment() {
            this.loading = true
            console.log("ADD COMMENT")
            if (this.replying) {
                this.addSubComment()
            }

            else {
                let {data} = await this.$apollo.mutate({
                    mutation: gql`mutation AddComment($card: String!, $cardAuthor: String!, $pill: String, $text: String!) {
                        addComment(card: $card, cardAuthor: $cardAuthor, pill: $pill, text: $text) {
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
                        text: this.text
                    }
                })

                this.card.comments.unshift(data.addComment)
            }

            this.loading = false
        }
    },

    props: ["card", "pill"]
}
</script>