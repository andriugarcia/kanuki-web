<template lang="pug">
    #Pill
        #mobile(v-if="!$vuetify.breakpoint.mdAndUp")
            v-toolbar.top(flat, color="kred")
                v-btn(icon, dark)
                    v-icon mdi-arrow-left
                v-text-field.mx-6(outlined, dark, rounded, dense, hide-details, color="white", placeholder="Buscar", append-icon="mdi-magnify")
            h1.mx-3(style="margin-top: 56px; font-size: 1.4em") {{$route.params.search ? `Resultados de ${$route.params.search}` : 'Recomendados'}}
            masonry(:cols="{default: 3}")
                v-card.ma-2.pa-1(v-for="(tag, i) in categories", :key="i", :color="tag.color", dark)
                    v-layout.my-6(justify-center)
                        v-icon(x-large) mdi-pill
                    .font-weight-bold(style="font-size: 1.5em") {{tag.name}}
            v-layout(v-if="$route.params.search", justify-center)
                v-btn-toggle.my-3
                    v-btn(text, color="kred")
                        .font-weight-bold.text-capitalize Todo
                    v-btn(text)
                        v-icon mdi-pill
                        .font-weight-bold.text-capitalize Pills
                    v-btn(text)
                        v-icon mdi-cards
                        .font-weight-bold.text-capitalize Cards
                    v-btn(text)
                        v-icon mdi-account
                        .font-weight-bold.text-capitalize Users
            v-layout.mx-3(v-if="$route.params.search", justify-space-between, align-center)
                .font-weight-bold Pills
                v-btn.font-weight-bold.text-capitalize(text, style="letter-spacing: 0") Ver todo
            v-layout.pl-3.hide-scroll(v-if="$route.params.search", justify-start, style="overflow-x: scroll")
                v-flex(v-for="(pill, i) in pills", :key="i", xs5, md5)
                    v-card.ma-1.pointer(style="position: relative; height: 100px;", v-ripple, @click="$router.push({path: `/p/${pill.name}`})")
                        v-img(:src="require('@/assets/images/pill-default-banner.png')", style="width: 100%; height: 24px; object-fit: cover")
                            v-layout.mr-1(justify-end)
                                .ma-1.font-weight-bold(style="font-size: .7em") {{pill.followersCount}}
                                v-icon(size="12") mdi-account
                        v-layout(column, align-center)
                            v-avatar.ml-2.mt-n3(size="32")
                                v-img(:src="require('@/assets/images/kanuki-pill-avatar-default.png')")
                            .font-weight-bold(style="font-size: .8em") p/{{pill.name | truncate}}
                            .mx-2.mb-2(style="font-size: .7em") {{pill.description | truncateDescription}}
            div(v-if="$route.params.search", v-for="(post, i) in cards", :key="i")
                post(:card="post")
                //- v-card.mb-7(v-else, style="border-radius: 24px", dark, :color="post.__typename == 'Pill' ? 'kred' : 'kblue'")
                //-     v-layout(align-center)
                //-         v-avatar(:size="32")
                //-             v-img(:src="post.__typename == 'Pill' ? post.avatar : post.author.avatar")
                //-         .font-weight-bold.ml-2(style="font-size: .8em") {{`${post.__typename == 'Pill' ? 'p/' : 'u/'}${post.name}`}}
                //-         v-spacer
                //-         follow(:name="post.name", :isUser="post.__typename == 'User'")        
        #desktop(v-else)
            v-layout(style="padding-top: 72px", align-start)
                v-flex(xs8)
                    h1 Resultados de {{$route.params.search}}
                    masonry.mt-4(:cols="{default: 2, 960: 1}")
                        div(v-for="(post, i) in cards", :key="i")
                            post(v-if="post.__typename == 'Card'", :card="post")
                            v-card.mb-7(v-else, style="border-radius: 24px", dark, :color="post.__typename == 'Pill' ? 'kred' : 'kblue'", @click="toPillOrCard(post)")
                                v-layout(align-center)
                                    v-avatar(:size="32")
                                        v-img(:src="post.__typename == 'Pill' ? post.avatar : post.author.avatar")
                                    .font-weight-bold.ml-2(style="font-size: .8em") {{`${post.__typename == 'Pill' ? 'p/' : 'u/'}${post.name}`}}
                                    v-spacer
                                    follow(:name="post.name", :isUser="post.__typename == 'User'")
                v-flex(xs4)
                    v-layout.mt-3(flex)
                        v-btn(text, :color="filter == '' ? 'kred' : 'black'", @click="filter = ''")
                            .font-weight-bold.text-capitalize Todo
                        v-btn(text, :color="filter == 'Pill' ? 'kred' : 'black'", @click="filter = 'Pill'")
                            v-icon mdi-pill
                            .font-weight-bold.text-capitalize Pills
                        v-btn(text, :color="filter == 'Card' ? 'kred' : 'black'", @click="filter = 'Card'")
                            v-icon mdi-cards
                            .font-weight-bold.text-capitalize Cards
                        v-btn(text, :color="filter == 'User' ? 'kred' : 'black'", @click="filter = 'User'")
                            v-icon mdi-account
                            .font-weight-bold.text-capitalize Users
                    

</template>

<script>
import Follow from "@/components/Follow"
import Post from "@/components/Post"
import gql from "graphql-tag"

export default {
    async asyncData({params, app, store}) {
        if (!params.search) return {}
        let client = app.apolloProvider.defaultClient

        let {data} = await client.query({
            query: gql`query Search($text: String!) {
                search(text: $text) {
                    cards {
                        name,
                        title,
                        karma,
                        type,
                        shareCount,
                        commentsCount,
                        content,
                        author {
                            name,
                            avatar
                        }
                    }
                    pills {
                        name,
                        avatar,
                        banner,
                        description,
                        followersCount
                    }
                    users {
                        name,
                        avatar
                    }
                }
            }`,
            variables: {
                text: params.search
            }
        })

        console.log(data.search)

        return {
            cards: data.search.cards,
            pills: data.search.pills,
            users: data.search.users,
            search: params.search
        }
    },

    components: {
        Follow,
        Post
    },

    data() {
        return {
            cards: [],
            pills: [],
            users: [],
            filter: "",
            categories: [
                {name: "News", color: "blue"}, {name: "Tech", color: "blue"}, 
                {name: "Sports", color: "green"}, {name: "Travel", color: "blue"}, 
                {name: "Science", color: "blue"}, {name: "TV", color: "blue"}, 
                {name: "Health", color: "blue"}, {name: "Ideas", color: "blue"}, 
                {name: "Business", color: "blue"}, {name: "Culture", color: "blue"}, 
                {name: "Entretainment", color: "blue"}, {name: "Football", color: "blue"}, 
                {name: "Photography", color: "blue"}, {name: "Cinema", color: "blue"}, 
                {name: "Gastronomy", color: "blue"}, {name: "Recepies", color: "blue"}, 
                {name: "Home", color: "blue"}, {name: "Apple", color: "blue"}, 
                {name: "Android", color: "blue"}, {name: "Design", color: "blue"}, 
                {name: "Auto", color: "blue"}
            ],
            search: "",
        }
    },

    methods: {
        toPillOrCard(post) {
            let letter = post.__typename == 'Pill' ? 'p' : 'u'
            this.$router.push({path: `/${letter}/${post.name}`})
        }
    }
}
</script>

<style lang="scss" scoped>
    .top {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 30;
    }
</style>