<template lang="pug">
    #User
        #mobile(v-if="isMounted && !$vuetify.breakpoint.mdAndUp")
            v-app-bar(absolute, color="kblue", dark, shrink-on-scroll, prominent, src="https://picsum.photos/1920/1080?random", fade-img-on-scroll, scroll-target="#scroll", scroll-threshold="500")
                template(v-slot:img="{ props }")
                    v-img(v-bind="props")
                v-btn(icon, color="black")
                    v-icon mdi-arrow-left
                v-toolbar-title
                    v-layout(align-center, size="64")
                        v-avatar(size="32", color="indigo")
                        .font-weight-bold.ml-2(style="font-size: .6em") u/{{user.name}}
                v-spacer
                follow.mt-2(:name="user.name", :isUser="true")
            v-sheet#scroll.overflow-y-auto(style="max-height: 92vh")
                v-container(style="height: 140px")
                .pa-3.mt-5
                    .font-weight-bold Biografía 
                    div {{user.bio}}
                    follow.my-2(:name="user.name", block, :isUser="true")
                    //- post(v-for="(publication, i) in user.publications", :key="i", :card="publication.card")
                    post(v-for="(card, i) in user.cards", :key="i", :card="card")
        #desktop(v-else)
            v-layout(style="padding-top: 72px", align-start)
                v-flex(xs8)
                    masonry(v-if="!edit", :cols="{default: 2, 960: 1}")
                        post(v-for="(card, i) in user.cards", :key="i", :card="card")
                    edit-user(v-else, :user="user", @save="saveUser", @cancel="edit = false")
                v-flex(xs4)
                    v-card.ma-1.pa-3
                        v-layout(justify-space-between, align-center)
                            v-btn(icon, color="black")
                                v-icon mdi-arrow-left
                            follow.mt-2(:name="user.name", :isUser="true")
                        v-layout.pa-2(align-center)
                            v-avatar(size="64")
                                v-img(:src="user.avatar")
                            .ml-2
                                .font-weight-bold u/{{user.name}}  
                                .grey--text {{user.karma}}K - {{user.followersCount}} Seguidores                      
                        .font-weight-bold.mt-4 Biografía 
                        div {{user.bio}}
                        follow.my-2(:name="user.name", block, :isUser="true")
                    v-layout.pa-3(v-if="whoami.name == user.name", justify-center)
                        v-btn.mr-1.font-weight-bold(rounded, depressed, :color="edit ? 'black' : '#00000010'", @click="edit = true", :dark="edit", :class="{'kred--text': !edit}")
                            v-icon {{edit ? 'mdi-content-save' : 'mdi-settings'}}
                            .ml-2.text-capitalize(style="letter-spacing: 0") {{edit ? 'Guardar' : 'Configuración'}}
                        v-btn.ml-1.font-weight-bold(rounded, depressed, color="#00000010")
                            v-icon.kblue--text mdi-poll
                            .ml-2.text-capitalize.kblue--text(style="letter-spacing: 0") Analíticas


</template>

<script>
import Follow from "@/components/Follow"
import Post from "@/components/Post"
import gql from "graphql-tag"

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