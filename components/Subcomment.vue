<template lang="pug">
    #SubComment
        div(style="position: relative")
            v-card.pa-6.mt-12(color="grey lighten-3", style="border-radius: 24px", flat)
                div {{comment.text}}
            v-card(style="position: absolute; top: -24px; right: 48px; left: 12px; border-radius: 24px")
                v-layout(align-center)
                    v-avatar(size="40")
                        v-img(:src="comment.author.avatar")
                    .ml-1
                        .hover.rounded.font-weight-bold(style="font-size: .8em", @click="$router.push({path: `/u/${comment.author.name}`})") {{`u/${comment.author.name}`}}
                    v-spacer
                    //- v-btn.mr-2(text, small, rounded, @click="$emit('reply')")
                        .text-capitalize.font-weight-bold Reply
                        v-icon mdi-reply
            v-layout(style="position: absolute; bottom: -16px; left: 0; right: 0", justify-center)
                karma(:comment="comment")

</template>

<script>
import Karma from "@/components/Karma"

export default {
    components: {
        Karma,
    },

    props: {
        comment: Object
    }
}
</script>