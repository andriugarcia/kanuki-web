<template lang="pug">
    #Pill
        #mobile(v-if="!$vuetify.breakpoint.mdAndUp")
            v-toolbar.top(flat, color="kred")
                v-btn(icon, dark)
                    v-icon mdi-arrow-left
                v-text-field.mx-6(outlined, dark, rounded, dense, hide-details, color="white", :placeholder="$t('search.header')", append-icon="mdi-magnify")
            h1.ml-4(style="margin-top: 72px; font-size: 1.8em") {{$route.params.search ? `${$t('search.resultsof')} ${$route.params.search}` : $t('search.recommend')}}
            v-layout.mx-4(justify-space-around)
                v-overflow-btn(:label="$t('search.filterby')", v-model="filter", :item-text="[$t('search.all'), $t('pills'), $t('pages'), $t('authors')]")
                v-overflow-btn(:label="$t('search.orderby')", v-model="order", :items="[$t('search.relevance'), $t('search.popular'), $t('search.visited'), $t('search.new')]")
            //- masonry(:cols="{default: 3}")
                v-card.ma-2.pa-1(v-for="(tag, i) in categories", :key="i", :color="tag.color", dark)
                    v-layout.my-6(justify-center)
                        v-icon(x-large) mdi-pill
                    .font-weight-bold(style="font-size: 1.5em") {{tag.name}}
            //- v-layout(v-if="$route.params.search", justify-center)
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
                .font-weight-bold {{$t('pills')}}
                v-btn.font-weight-bold.text-capitalize(text, style="letter-spacing: 0") {{$t('seeAll')}}
            v-layout.pl-3.hide-scroll(v-if="$route.params.search", justify-start, style="overflow-x: scroll")
                v-flex(v-for="(pill, i) in pills", :key="i", xs5, md5)
                    v-card.ma-1.pointer(style="position: relative; height: 100px;", v-ripple, @click="$router.push({path: `/p/${pill.name}`})")
                        v-img(:src="require('@/assets/images/pill-default-banner.png')", style="width: 100%; height: 24px; object-fit: cover")
                            v-layout.mr-1(justify-end)
                                .ma-1.font-weight-bold.uns(style="font-size: .7em") {{pill.followersCount}}
                                v-icon(size="12") mdi-account
                        v-layout(column, align-center)
                            v-avatar.ml-2.mt-n3(size="32")
                                v-img(:src="require('@/assets/images/kanuki-pill-avatar-default.png')")
                            .font-weight-bold.uns(style="font-size: .8em") p/{{pill.name | truncate}}
                            .mx-2.mb-2.uns(style="font-size: .7em") {{pill.description | truncateDescription}}
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
                    div
                        h1.ml-12 Resultados de {{$route.params.search}}
                        v-layout.ml-8(justify-space-between)
                            v-subheader {{$t('search.booksAndAuthors')}}
                            v-btn.font-weight-bold.text-capitalize(text, large, color="kred", style="letter-spacing: 0") {{$t('seeAll')}}
                        v-list(three-line, color="transparent", dense)
                            v-list-item.py-0(v-for="i in 3", :key="i", @click="")
                                v-list-item-avatar
                                    v-img(:src="require('@/assets/images/kanuki-pill-avatar-default.png')")
                                v-list-item-content
                                    v-list-item-title
                                        v-layout(align-center)
                                            .font-weight-bold p/pill
                                            .ml-2 120K Suscritos
                                            v-spacer
                                            follow.ml-2(name="pill", small)
                                    v-list-item-subtitle {{$t('lorem')}}
                        v-subheader.text-uppercase.ml-12 {{$t('pages')}}
                        masonry(:cols="{default: 2, 960: 1}")
                            div(v-for="(post, i) in cards", :key="i")
                                post(v-if="post.__typename == 'Card'", :card="post")
                                //- v-card.mb-7(v-else, style="border-radius: 24px", dark, :color="post.__typename == 'Pill' ? 'kred' : 'kblue'", @click="toPillOrCard(post)")
                                    v-layout(align-center)
                                        v-avatar(:size="32")
                                            v-img(:src="post.__typename == 'Pill' ? post.avatar : post.author.avatar")
                                        .font-weight-bold.ml-2(style="font-size: .8em") {{`${post.__typename == 'Pill' ? 'p/' : 'u/'}${post.name}`}}
                                        v-spacer
                                        follow(:name="post.name", :isUser="post.__typename == 'User'")
                v-flex(xs4)
                    v-subheader.text-capitalize {{$t('search.filterby')}}
                    v-list(color="transparent")
                        v-list-item-group
                            v-list-item(text, color="kred", @click="filter = ''")
                                v-list-item-avatar
                                    v-icon mdi-circle
                                v-list-item-content
                                    v-list-item-title.font-weight-bold.text-capitalize {{$t('search.all')}}
                            v-list-item(@click="filter = 'pill'")
                                v-list-item-avatar 
                                    v-icon mdi-pill
                                v-list-item-content
                                    v-list-item-title.font-weight-bold.text-capitalize {{$t('pills')}}
                            v-list-item(@click="filter = 'card'")
                                v-list-item-avatar 
                                    v-icon mdi-cards
                                v-list-item-content
                                    v-list-item-title.font-weight-bold.text-capitalize {{$t('pages')}}
                            v-list-item(@click="filter = 'user'")
                                v-list-item-avatar 
                                    v-icon mdi-account
                                v-list-item-content
                                    v-list-item-title.font-weight-bold.text-capitalize {{$t('authors')}}
                    v-subheader.text-capitalize.mt-6 {{$t('search.orderby')}}
                    v-list(color="transparent")
                        v-list-item-group
                            v-list-item(color="kred", selected, @click="order = 'relevance'")
                                v-list-item-avatar
                                    v-icon mdi-star
                                v-list-item-content
                                    v-list-item-title.font-weight-bold.text-capitalize {{$t('search.relevance')}}
                            v-list-item(:color="order == 'Pill' ? 'kred' : 'black'", @click="order = 'popular'")
                                v-list-item-avatar
                                    v-icon mdi-tooltip-plus
                                v-list-item-content
                                    v-list-item-title.font-weight-bold.text-capitalize {{$t('search.popular')}}
                            v-list-item(:color="order == 'Pill' ? 'kred' : 'black'", @click="order = 'Visited'")
                                v-list-item-avatar
                                    v-icon mdi-bullseye-arrow
                                v-list-item-content
                                    v-list-item-title.font-weight-bold.text-capitalize {{$t('search.visited')}}
                            v-list-item(:color="order == 'Card' ? 'kred' : 'black'", @click="order = 'new'")
                                v-list-item-avatar
                                    v-icon mdi-clock-outline
                                v-list-item-content
                                    v-list-item-title.font-weight-bold.text-capitalize {{$t('search.new')}}

                    

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
            order: "relevance",
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