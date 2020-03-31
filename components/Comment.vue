<template lang="pug">
    #Comment
        div(style="position: relative")
            v-card.pa-6.mx-2.mt-12(color="grey lighten-3", style="border-radius: 24px", flat)
                div {{comment.text}}
            v-card(style="position: absolute; top: -24px; right: 48px; left: 12px; border-radius: 24px")
                v-layout(align-center)
                    v-avatar(size="40")
                        v-img(:src="comment.author.avatar")
                    .ml-1
                        .hover.rounded.font-weight-bold.uns(style="font-size: .8em", @click="$router.push({path: `/u/${comment.author.name}`})") {{`u/${comment.author.name}`}}
                        .hover.rounded.uns(style="font-size: .8em", @click="$router.push({path: typeof comment.pill != 'undefined' ? `/p/${comment.pill.name}` : `/u/${comment.author.name}`})") {{typeof comment.pill != 'undefined' ? `p/${comment.pill.name}` : `u/${comment.author.name}`}}
                    v-spacer
                    v-btn.mr-2(text, small, rounded, @click="reply(comment)")
                        .text-capitalize.font-weight-bold Reply
                        v-icon mdi-reply
            v-layout(style="position: absolute; bottom: -16px; left: 0; right: 0", justify-center)
                karma(:comment="comment")
        div(v-if="comment.subComments && comment.subComments.length != 0")
            .mx-2(v-if="!answersOpen")
                v-btn.mt-6.font-weight-bold.text-capitalize(block, :color="n%3==0 ? 'kblue' : n%3==1 ? 'kred' : 'kyellow'", rounded, dark, @click="answersOpen = true") {{ comment.subComments.length }} respuestas
            v-card.pb-6.pt-2.mt-6(v-else, style="border-radius: 24px", :color="n%3==0 ? 'kblue' : n%3==1 ? 'kred' : 'kyellow'")
                v-layout.ml-2
                    v-avatar(:size="32")
                        v-img(:src="comment.author.avatar")
                    .ml-2.uns(style="font-size: .8em", :class="{'white--text': n%3!=2}") Contestando a <b>u/{{comment.author.name}}</b>
                comment(v-for="(subcomment, i) in comment.subComments", :key="i", :comment="subcomment", :n="n+1", @reply="reply")

</template>

<script>
import Karma from "@/components/Karma"

export default {
    components: {
        Karma,
        Comment: () => import("@/components/Comment")
    },

    computed: {
        logged() {
            return this.$store.state.core.logged
        }
    },

    data() {
        return {
            answersOpen: false
        }
    },

    methods: {
        reply(comment) {
            if (!this.$store.state.auth.logged) {
                this.$store.commit('core/setOpenAccountPopup', true)
                return
            }
            this.$emit('reply', comment)
        }
    },

    props: {
        comment: Object,
        n: Number
    }
}
</script>