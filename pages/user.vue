<template lang="pug">
    #User
        #mobile(v-if="isMounted && !$vuetify.breakpoint.mdAndUp")
            div(v-if="!edit")
                .ma-1.pa-3
                    v-layout(align-center)
                        v-btn(v-if="!$vuetify.breakpoint.mdAndUp", icon, color="black", @click="$router.go(-1)")
                            v-icon mdi-arrow-left
                        b.ml-2 u/{{user.name}}
                        v-spacer
                        follow.mt-2(:name="user.name", :isUser="true")
                    v-layout.pa-2(justify-space-between, align-center)
                        v-avatar(size="64")
                            v-img(:src="user.avatar")
                        .text-center
                            b(style="font-size: 1.3em;") {{ user.cards.length }}
                            div(style="font-size: .8em") {{$t('pages')}}
                        .text-center
                            b(style="font-size: 1.3em;") {{ user.karma }}
                            div(style="font-size: .8em") {{$t('karma')}}
                        .text-center
                            b(style="font-size: 1.3em;") {{ user.followersCount }}
                            div(style="font-size: .8em") {{$t('followers')}}
                        //- .ml-2
                            .font-weight-bold.uns u/{{user.name}}  
                            .grey--text.uns {{user.karma}}K - {{user.followersCount}} Seguidores                      
                    div {{user.bio}}
                    follow.my-2(:name="user.name", block, :isUser="true")
                v-layout.pa-3.mb-6(v-if="whoami.name == user.name", justify-center)
                    v-btn.mr-1.font-weight-bold(rounded, depressed, :color="edit ? 'black' : '#00000010'", @click="edit = true", :dark="edit", :class="{'kred--text': !edit}")
                        v-icon {{edit ? 'mdi-content-save' : 'mdi-cog'}}
                        .ml-2.text-capitalize.uns(style="letter-spacing: 0") {{edit ? $t('save') : $t('config')}}
                    v-btn.ml-1.font-weight-bold(rounded, depressed, color="#00000010")
                        v-icon.kblue--text mdi-poll
                        .ml-2.text-capitalize.kblue--text(style="letter-spacing: 0") {{$t('analytics.header')}}
                fixed-cards.my-3
                post(v-for="(card, i) in user.cards", :key="i", :card="card")
            edit-user(v-else, :user="user", @save="saveUser", @cancel="edit = false")
        #desktop(v-else)
            v-layout(style="padding-top: 72px", align-start)
                v-flex(xs8)
                    masonry(v-if="!edit", :cols="{default: 2, 960: 1}")
                        post(v-for="(card, i) in user.cards", :key="i", :card="card")
                    edit-user(v-else, :user="user", @save="saveUser", @cancel="edit = false")
                v-flex(xs4)
                    .ma-1.pa-3
                        v-layout(align-center)
                            v-btn(icon, color="black")
                                v-icon mdi-arrow-left
                            b.ml-2 u/{{user.name}}
                            v-spacer
                            follow.mt-2(:name="user.name", :isUser="true")
                        v-layout.pa-2(justify-space-between, align-center)
                            v-avatar(size="64")
                                v-img(:src="user.avatar")
                            .text-center
                                b(style="font-size: 1.3em;") {{ user.cards.length }}
                                div(style="font-size: .8em") {{$t('pages')}}
                            .text-center
                                b(style="font-size: 1.3em;") {{ user.karma }}
                                div(style="font-size: .8em") {{$t('karma')}}
                            .text-center
                                b(style="font-size: 1.3em;") {{ user.followersCount }}
                                div(style="font-size: .8em") {{$t('followers')}}
                            //- .ml-2
                                .font-weight-bold.uns u/{{user.name}}  
                                .grey--text.uns {{user.karma}}K - {{user.followersCount}} Seguidores                      
                        div {{user.bio}}
                        follow.my-2(:name="user.name", block, :isUser="true")
                    fixed-cards.my-8
                    v-layout.pa-3(v-if="whoami.name == user.name", justify-center)
                        v-btn.mr-1.font-weight-bold(rounded, depressed, :color="edit ? 'black' : '#00000010'", @click="edit = true", :dark="edit", :class="{'kred--text': !edit}")
                            v-icon {{edit ? 'mdi-content-save' : 'mdi-cog'}}
                            .ml-2.text-capitalize(style="letter-spacing: 0") {{edit ? $t('save') : $t('config')}}
                        v-btn.ml-1.font-weight-bold(rounded, depressed, color="#00000010")
                            v-icon.kblue--text mdi-poll
                            .ml-2.text-capitalize.kblue--text(style="letter-spacing: 0") {{$t('analytics.header')}}


</template>

<script>
import Follow from "@/components/Follow"
import Post from "@/components/Post"
import gql from "graphql-tag"
import FixedCards from "@/components/FixedCards"

export default {
    async asyncData({app, params, store}) {
        let client = app.apolloProvider.defaultClient
        let autenticated = store.state.auth.user.name ? true : false

        let data = await client.query({
            query: gql`query GetUser($user: String!) {
          getUser(name: $user) {
            name,
            email,
            avatar,
            karma,
            bio,
            locale,
            followersCount,
            cards {
                name,
                title,
                karma,
                ${autenticated ? 'vote,' : ''}
                type,
                shareCount,
                commentsCount,
                content,
                author {
                    name,
                    avatar
                },
                createdAt
            },
            publications {
              pill {
                name
              },
              card {
                name,
                title,
                karma,
                ${autenticated ? 'vote,' : ''}
                type,
                shareCount,
                commentsCount,
                content,
                author {
                    name
                }
              },
              createdAt
            }
          }
        }`,
            variables: {
                user: params.author
            }
        })

        console.log(data.data.getUser)
        return {
            user: data.data.getUser
        }
    },

    components: {
        Follow,
        Post,
        FixedCards,
        EditUser: () => import("@/components/EditUser")
    },

    computed: {
        isMounted() {
            return this.$store.state.core.isMounted
        },

        whoami() {
            return this.$store.state.auth.user
        }
    },

    data() {
        return {
            user: {},
            edit: false
        }
    },

    methods: {
        async saveUser() {
            await this.$apollo.mutate({
                mutation: gql`mutation EditUser($avatar: String, $locale: Locale, $email: String, $bio: String) {
                    editUser(avatar: $avatar, locale: $locale, email: $email, bio: $bio) {
                        name
                    }
                }`,
                variables: this.user
            })
        }
    }
}
</script>