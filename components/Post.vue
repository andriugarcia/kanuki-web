<template lang="pug">
    #post.ma-1.mb-7(style="position: relative", @click="toCard")
        v-card.pointer(style="border-radius: 24px", v-ripple)
            client-only
                v-layout(slot="placeholder", justify-center, align-center)
                    v-skeleton-loader.rounded(type="image", style="width: 100%")
                    //- v-progress-circular(:size="100", :width="8", color="#4F9CD1", indeterminate)
                component.rounded(:is="dynamicTemplate", :content="content", :user="card.author", :card="card", isMiniature)
            .pa-3
                .font-weight-bold(style="font-size: 1.4em") {{ card.title }}
                p {{card.description}}
                bottom-post-bar(:card="card")
        v-card(style="position: absolute; top: -16px; right: 48px; left: 12px; border-radius: 24px")
            v-layout(align-center)
                v-avatar(size="40")
                    v-img(:src="pill ? pill.avatar : card.author.avatar")
                .ml-1
                    .font-weight-bold.hover.px-1(v-ripple, @click.stop="toPill", style="max-width: 100%; font-size: .8em; border-radius: 12px") {{(pill ? `p/${pill}` : card.title) | truncate}}
                    .hover.px-1(v-ripple, @click.stop="toUser", style="font-size: .8em; border-radius: 12px") u/{{card.author.name | truncate}}
                v-spacer
                follow.mx-2(:name="pill || card.author.name", :isUser="!pill")
            
</template>

<script>
import Follow from '@/components/Follow'
import BottomPostBar from '@/components/BottomPostBar'
import truncate from '@/helpers/truncate'

import externalComponent from '@/helpers/external-component';

export default {
    components: {
        Follow,
        BottomPostBar,
        "v-template": () => import("kanuki-article")
    },

    computed: {
        content() {
            return JSON.parse(this.card.content)
        },

        dynamicTemplate() {
            return () => externalComponent(`http://localhost:8200/kanuki-${this.card.type}/kanuki-${this.card.type}.umd.min.js`)
        },
    },

    filters: {
        truncate(value) {
            let str = value.toString()
            return truncate(str, 16)
        }
    },

    methods: {
        toPill() {
            if (this.pill) {
                this.$router.push(`/p/${this.pill}`)
            }
            else {
                this.toCard()
            }
        },

        toUser() {
            this.$router.push(`/u/${this.card.author.name}`)
        },

        toCard() {
            let path
            if (this.pill) {
                path = `/p/${this.pill}/${this.card.author.name}/${this.card.name}`
            }
            else {
                path = `/u/${this.card.author.name}/${this.card.name}`
            }
            this.$router.push({path})
        }
    },

    props: {
        pill: {
            type: String
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