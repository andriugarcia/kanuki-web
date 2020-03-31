<template lang="pug">
    #Comments
        .font-weight-bold.my-5.ml-3.uns {{card.comments.length}} {{ $t('comments.header') }}
        v-card.mb-2(v-if="replying && $vuetify.breakpoint.mdAndUp", flat, color="grey lighten-2")
            .pa-1.pl-2(style="border-left: 2px solid #ED5261")
                .font-weight-bold.hover(style="font-size: .8em") u/{{replyingComment.author.name}}
                .uns(style="font-size: .8em") {{replyingComment.text}}
        v-card(v-if="$vuetify.breakpoint.mdAndUp", style="border-radius: 24px")
            v-card(v-if="!logged", flat, @click="$store.commit('core/setOpenAccountPopup', true)")
                v-alert(type="info", color="kblue") {{ $t('comments.alert') }}
            v-textarea.pb-3(v-else, v-model="text", solo, flat, auto-grow, hide-details, rows="1", :placeholder="replying ? `${$t('comments.replying')} u/${replyingComment.author.name}` : $t('comments.write')")
                v-badge.mr-3(slot="append-outer", left, overlap, color="transparent")
                    template(v-if="replying", slot="badge")
                        v-avatar(:size="24")
                            v-img(:src="replyingComment.author.avatar")
                    v-btn(fab, :loading="loading", dark, :disabled="text == '' || !logged", depressed, small, color="kblue", @click="addComment")
                        v-icon(small) mdi-send
                v-btn(v-if="replying", small, icon, slot="append", @click="unReply") 
                    v-icon mdi-close
        div(style="padding-bottom: 200px;")
            comment.list-item(v-for="(comment, i) in card.comments", :key="i", :comment="comment", :n="0", @reply="replay")
        v-card.pb-3(v-if="!$vuetify.breakpoint.mdAndUp", style="position: fixed; bottom: 0; left: 0; right: 0")
            v-card(v-if="!logged", flat, @click="$store.commit('core/setOpenAccountPopup', true)")
                v-alert(type="info", color="kblue") {{ $t('comments.alert') }}
            div(v-else)
                v-card.mb-2(v-if="replying", flat, color="grey lighten-2")
                    .pa-1.pl-2(style="border-left: 2px solid #ED5261")
                        .font-weight-bold.hover.uns(style="font-size: .8em") u/{{replyingComment.author.name}}
                        div(style="font-size: .8em") {{replyingComment.text}}
                v-textarea(v-model="text",  solo, flat, auto-grow, hide-details, rows="1", :placeholder="replying ? `${$t('comments.replying')} u/${replyingComment.author.name}` : $t('comments.write')")
                    v-btn(v-if="replying", slot="append", icon, @click="unReply") 
                        v-icon mdi-close
                    v-badge.mr-3(slot="append-outer", left, overlap, color="transparent")
                        template(v-if="replying", slot="badge")
                            v-avatar(:size="24")
                                v-img(:src="replyingComment.author.avatar")
                        v-btn(fab, :loading="loading", dark, depressed, :disabled="text == '' || !logged", small, color="kblue", @click="addComment")
                            v-icon(small) mdi-send
</template>

<script>
import Comment from "@/components/Comment"
import gql from "graphql-tag"

export default {
    components: {
        Comment
    },

    computed: {
        logged() {
            return this.$store.state.auth.logged
        }
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

<style lang="scss" scoped>
    .list-enter-active, .list-leave-active {
        transition: all .5s;
    }
    .list-enter, .list-leave-to  {
        opacity: 0;
    }
</style>