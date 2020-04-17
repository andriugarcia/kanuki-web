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
                    type: "image",
                    content: {
                        img: "https://www.oxygenna.com/wp-content/uploads/2015/11/18.jpg",
                        
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
