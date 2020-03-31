<template lang="pug">
    #post.ma-1.mb-4(style="position: relative", @click="toCard")
        v-card(hover, v-ripple, color="white")
            v-layout.pa-2(align-center)
                v-avatar(size="40")
                    v-img(:src="pill ? pill.avatar : card.author.avatar")
                .ml-1
                    .font-weight-bold.hover.px-1.uns(v-ripple, @click.stop="toPill", style="max-width: 100%; font-size: .8em; border-radius: 12px") {{(pill ? `En ${pill.name}` : card.title) | truncate}}
                    .hover.px-1.uns(v-ripple, @click.stop="toUser", style="font-size: .8em; border-radius: 12px") Por {{card.author.name | truncate}}
                v-spacer
                follow.mx-2(:name=" pill ? pill.name : card.author.name", :isUser="!pill")
            client-only
                div(style="max-height: 300px;")
                    components-renderer(:content="test", isMiniature)
                //- v-layout(slot="placeholder", justify-center, align-center)
                    v-skeleton-loader.rounded(type="image", style="width: 100%")
                    //- v-progress-circular(:size="100", :width="8", color="#4F9CD1", indeterminate)
                //- component.rounded(:is="dynamicTemplate", @save="save", :content="content", :user="card.author", :card="card", isMiniature)
            v-layout.mt-n10.px-6(justify-end)
                like-button(:name="card.name", :author="card.author.name")
            .px-3.pb-3
                .font-weight-bold.uns(style="font-size: 1.4em") {{ card.title }}
                p {{card.description}}
                bottom-post-bar(:card="card")
        v-speed-dial(v-if="removeable", :value="fab", @click.native.stop="fab = true", transition="slide-y-transition", direction="bottom", style="position: absolute; top: -16px; right: 12px;")
            template(v-slot:activator)
                v-btn(small, fab)
                    v-icon(small) mdi-cog
            v-btn(fab, color="kyellow", small, @click.stop="")
                v-icon(small) mdi-pin
            v-btn(fab, color="red", small, dark, @click.stop="removePublication()")
                v-icon(small) mdi-close
            
</template>

<script>
import Follow from '@/components/Follow'
import BottomPostBar from '@/components/BottomPostBar'
import LikeButton from '@/components/LikeButton'
import truncate from '@/helpers/truncate'
import componentsRenderer from "@/components/ComponentsRenderer"

import externalComponent from '@/helpers/external-component';

export default {
    components: {
        Follow,
        BottomPostBar,
        LikeButton,
        componentsRenderer,
        "v-template": () => import("kanuki-article")
    },

    computed: {
        content() {
            return JSON.parse(this.card.content)
        },

        dynamicTemplate() {
            return () => externalComponent(this.card.type)
        },
    },

    data() {
        return {
            fab: false,
            test: [
                {
                    id: "exe8fy9dys7fds78fd",
                    type: "cover",
                    content: {
                        img: "data:image/jpeg;base64,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... (61111 total length)",
                        title: "Titulo"
                    }
                },
            ]
        }
    },

    filters: {
        truncate(value) {
            let str = value.toString()
            return truncate(str, 30)
        }
    },

    methods: {
        toPill() {
            if (this.pill) {
                this.$router.push(`/p/${this.pill.name}`)
            }
            else {
                this.toCard()
            }
        },

        async removePublication() {
            this.$store.dispatch("publication/remove", {card: this.card, pill: this.pill.name})

            this.$el.parentNode.removeChild(this.$el)            
        },

        toUser() {
            this.$router.push(`/u/${this.card.author.name}`)
        },

        toCard() {
            let path
            if (this.pill) {
                path = `/p/${this.pill.name}/${this.card.author.name}/${this.card.name}`
            }
            else {
                path = `/u/${this.card.author.name}/${this.card.name}`
            }
            this.$router.push({path})
        },

        async save() {
            const gql = require("graphql-tag")
            console.log("saving")
            await this.$apollo.mutate({
                mutation: gql`mutation EditCard($name: String!, $description: String, $content: String) {
                    editCard(name: $name, description: $description, content: $content) {
                        name
                    }
                }`,

                variables: {
                    name: this.card.name,
                    description: this.card.description,
                    content: JSON.stringify(this.content)
                }
            })
        },
    },

    props: {
        pill: {
            type: Object
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
        },

        removeable: Boolean
    }
}
</script>

<style lang="scss" scoped>
    .v-speed-dial--direction-bottom .v-speed-dial__list {
        padding: 2px 0 !important;
    }

    .v-speed-dial__list .v-btn {
        margin: 2px !important;   
    }
</style>
