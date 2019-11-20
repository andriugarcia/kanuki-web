<template lang="pug">
    #Comment
        div(style="position: relative")
            v-card.pa-6.mt-12(color="grey lighten-3", style="border-radius: 24px", flat)
                div {{comment.text}}
            v-card(style="position: absolute; top: -24px; right: 48px; left: 12px; border-radius: 24px")
                v-layout(align-center)
                    v-avatar(size="40")
                        v-img(:src="comment.author.avatar")
                    .ml-1
                        .hover.rounded.font-weight-bold(style="font-size: .8em", @click="$router.push({path: `/u/${comment.author.name}`})") {{`u/${comment.author.name}`}}
                        .hover.rounded(style="font-size: .8em", @click="$router.push({path: typeof comment.pill != 'undefined' ? `/p/${comment.pill.name}` : `/u/${comment.author.name}`})") {{typeof comment.pill != 'undefined' ? `p/${comment.pill.name}` : `u/${comment.author.name}`}}
                    v-spacer
                    v-btn.mr-2(text, small, rounded, @click="$emit('reply')")
                        .text-capitalize.font-weight-bold Reply
                        v-icon mdi-reply
            v-layout(style="position: absolute; bottom: -16px; left: 0; right: 0", justify-center)
                karma(:comment="comment")
        v-btn.mt-6.font-weight-light.text-capitalize(v-if="!answersOpen", dense, text, @click="answersOpen = true") <b><b>{{ comment.subComments.length }}</b></b> &nbsprespuestas
        .ml-2.mt-6.pl-4(v-else, style="border-left: 2px solid #ED5261")
            sub-comment(v-for="(subcomment, i) in comment.subComments", :key="i", :comment="subcomment")

</template>

<script>
import Karma from "@/components/Karma"

export default {
    components: {
        Karma,
        SubComment: () => import("@/components/Subcomment")
    },

    data() {
        return {
            answersOpen: false
        }
    },

    props: {
        comment: Object,
    }
}
</script>