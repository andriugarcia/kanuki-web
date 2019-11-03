<template lang="pug">
    #post.ma-1.mt-7(style="position: relative")
        v-card(style="border-radius: 24px")
            div(isMiniature, style="height: 64px; border-radius: 24px")
            .pa-3
                .title {{ card.title }}
                p {{card.description}}
                bottom-post-bar(:comments="card.commentsCount", :karma="card.karma", :share="card.shareCount")
        v-card(style="position: absolute; top: -16px; right: 48px; left: 12px; border-radius: 24px")
            v-layout(align-center)
                v-avatar(color="indigo", size="40")
                .ml-1
                    .font-weight-bold(style="font-size: .8em") {{origin}}
                    div(style="font-size: .8em") u/{{card.author.name}}
                v-spacer
                follow.mx-2
            
</template>

<script>
import Follow from '@/components/Follow'
import BottomPostBar from '@/components/BottomPostBar'

export default {
    components: {
        Follow,
        BottomPostBar,
        Paper: () => import("kanuki-article")
    },

    props: {
        origin: {
            type: String,
            default: "p/pill"
        },

        card: {
            type: Object,
            default: function() {return {
                title: "Card",
                name: "card",
                author: {
                    name: "versy"
                },
                description: "Description",
                karma: 380,
                commentsCount: 380,
                shareCount: 380,
            }}
        }
    }
}
</script>