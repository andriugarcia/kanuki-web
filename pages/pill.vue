<template lang="pug">
    #Pill
        #mobile(v-if="!$vuetify.breakpoint.mdAndUp")
            v-app-bar(absolute, color="kred", dark, shrink-on-scroll, prominent, src="https://picsum.photos/1920/1080?random", fade-img-on-scroll, scroll-target="#scroll", scroll-threshold="500")
                template(v-slot:img="{ props }")
                    v-img(v-bind="props", gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)")
                v-btn(icon)
                    v-icon mdi-arrow-left
                v-toolbar-title
                    v-layout
                        v-avatar(size="32", color="indigo")
                        .font-weight-bold.ml-2 p/{{pill.name}}
                v-spacer
                follow
            v-sheet#scroll.overflow-y-auto(style="max-height: 92vh")
                v-container(style="height: 140px")
                .pa-3
                    .font-weight-bold Descripción 
                    div {{pill.description}}
                    v-btn.my-3(block, rounded, color="kred", outlined)
                        v-icon mdi-pill
                        div FOLLOW
                    v-btn(block, rounded, dark, color="kblue")
                        v-icon mdi-plus
                        div CREAR POST
                    post(v-for="(publication, i) in pill.publications", :key="i", :card="publication.card", :pill="publication.pill.name")
        #desktop(v-else)
            v-layout(style="padding-top: 72px")
                v-flex(xs8)
                    masonry(:cols="{default: 2, 960: 1}")
                        post(v-for="(publication, i) in pill.publications", :key="i", :card="publication.card", :pill="publication.pill.name")
                v-flex(xs4)
                    v-card.ma-1
                        v-app-bar(absolute, color="kred", dark, shrink-on-scroll, prominent, src="https://picsum.photos/1920/1080?random", fade-img-on-scroll, scroll-target="#scroll", scroll-threshold="500")
                            template(v-slot:img="{ props }")
                                v-img(v-bind="props", gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)")
                            v-btn(icon)
                                v-icon mdi-arrow-left
                            v-toolbar-title
                                v-layout
                                    v-avatar(size="32", color="indigo")
                                    .font-weight-bold.ml-2 p/{{pill.name}}
                            v-spacer
                            follow.mt-2
                        v-sheet#scroll.overflow-y-auto(style="max-height: 92vh")
                            v-container(style="height: 140px")
                            .pa-3
                                .font-weight-bold Descripción 
                                div {{pill.description}}
                                v-btn.my-3(block, rounded, color="kred", outlined)
                                    v-icon mdi-pill
                                    div FOLLOW
                                v-btn(block, rounded, dark, color="kblue")
                                    v-icon mdi-plus
                                    div CREAR POST


</template>

<script>
import Follow from "@/components/Follow"
import Post from "@/components/Post"
import gql from "graphql-tag"

export default {
    async asyncData({app, params}) {
        let client = app.apolloProvider.defaultClient

        let data = await client.query({
            query: gql`query GetPill($pill: String!) {
                getPill(name: $pill) {
                    name,
                    description,
                    tags,
                    publications {
                        pill {
                            name
                        },
                        card {
                            name,
                            title,
                            karma,
                            type,
                            shareCount,
                            commentsCount,
                            content,
                            author {
                                name
                            }
                        }

                    }
                    
                }
            }`,
            variables: {
                pill: params.pill
            }
        })

        console.log(data.data.getPill)
        return {
            pill: data.data.getPill
        }
    },

    components: {
        Follow,
        Post
    },

    data() {
        return {
            pill: {}
        }
    }
}
</script>