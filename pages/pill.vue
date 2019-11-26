<template lang="pug">
    #Pill
        #mobile(v-if="isMounted && !$vuetify.breakpoint.mdAndUp")
            v-app-bar(absolute, color="kred", dark, shrink-on-scroll, prominent, :src="pill.banner", fade-img-on-scroll, scroll-target="#scroll", scroll-threshold="500")
                template(v-slot:img="{ props }")
                    v-img(v-bind="props")
                v-btn(icon, @click="$router.go(-1)")
                    v-icon mdi-arrow-left
                v-toolbar-title
                    v-layout(align-center)
                        v-avatar(size="32")
                            v-img(:src="pill.avatar")
                        .font-weight-bold.ml-2(style="font-size: .6em") p/{{pill.name}}
                v-spacer
                follow.mt-2(:name="pill.name")
            v-sheet#scroll.overflow-y-auto(style="max-height: 92vh")
                v-container(style="height: 140px")
                .pa-3
                    .font-weight-bold Descripción 
                    div {{pill.description}}
                    follow.mt-2.mb-2(:name="pill.name", block)
                    v-btn.mb-10(block, rounded, small, dark, color="kblue", @click="createDialog = true")
                        v-icon(small) mdi-plus
                        .font-weight-bold(style="letter-spacing: 0; font-size: .8em") AÑADIR POST
                    post(v-for="(publication, i) in pill.publications", :key="i", :card="publication.card", :pill="publication.pill", :removeable="checkAdmin")
        #desktop(v-else)
            v-layout(style="padding-top: 72px", align-start)
                v-flex(xs8)
                    masonry(v-if="!edit", :cols="{default: 2, 960: 1}")
                        post(v-for="(publication, i) in pill.publications", :key="i", :card="publication.card", :pill="publication.pill", :removeable="checkAdmin")
                    edit-pill(v-else, :pill="pill", @save="savePill", @cancel="edit = false")
                v-flex(xs4)
                    v-card.ma-1
                        v-app-bar(absolute, color="kred", dark, shrink-on-scroll, prominent, :src="pill.banner", fade-img-on-scroll, scroll-target="#scroll", scroll-threshold="500")
                            template(v-slot:img="{ props }")
                                v-img(v-bind="props")
                            v-btn(icon, @click="$router.go(-1)")
                                v-icon mdi-arrow-left
                            v-toolbar-title
                                v-layout(align-center)
                                    v-avatar(size="32")
                                        v-img(:src="pill.avatar")
                                    .font-weight-bold.ml-2(style="font-size: .6em") p/{{pill.name}}
                            v-spacer
                            follow.mt-2(:name="pill.name")
                        v-sheet#scroll.overflow-y-auto(style="max-height: 92vh")
                            v-container(style="height: 140px")
                            .pa-3
                                .font-weight-bold Descripción 
                                div {{pill.description}}
                                follow.my-2(:name="pill.name", block)
                                v-btn(block, rounded, small, dark, color="kblue", @click="createDialog = true")
                                    v-icon(small) mdi-plus
                                    .font-weight-bold(style="letter-spacing: 0; font-size: .8em") AÑADIR POST
                    v-layout.pa-3(v-if="checkAdmin", justify-center)
                        v-btn.mr-1.font-weight-bold(rounded, depressed, :color="edit ? 'black' : '#00000010'", @click="edit = true", :dark="edit", :class="{'kred--text': !edit}")
                            v-icon {{edit ? 'mdi-content-save' : 'mdi-settings'}}
                            .ml-2.text-capitalize(style="letter-spacing: 0") {{edit ? 'Guardar' : 'Configuración'}}
                        v-btn.ml-1.font-weight-bold(rounded, depressed, color="#00000010")
                            v-icon.kblue--text mdi-poll
                            .ml-2.text-capitalize.kblue--text(style="letter-spacing: 0") Analíticas
        #CreatePost
            v-dialog(v-if="$vuetify.breakpoint.mdAndUp", v-model="createDialog", width="500")
                v-card.pa-2(style="border-radius: 24px 24px 0 0")
                    add-post
            v-bottom-sheet(v-else, v-model="createDialog", width="500")
                v-card.pa-2(style="border-radius: 24px 24px 0 0")
                    add-post


</template>

<script>
import Follow from "@/components/Follow"
import Post from "@/components/Post"
import gql from "graphql-tag"

export default {
    async asyncData({app, params, store}) {
        let client = app.apolloProvider.defaultClient

        let autenticated = store.state.auth.user.name ? true : false
        console.log("AUTH: ", autenticated)

        let data = await client.query({
            query: gql`query GetPill($pill: String!) {
                getPill(name: $pill) {
                    name,
                    description,
                    locale,
                    avatar,
                    banner,
                    ${autenticated ? 'writePermission,' : ''}
                    ${autenticated ? 'admins { name, avatar },' : ''}
                    publications {
                        pill {
                            name, avatar
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
                                name,
                                avatar
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
        Post,
        AddPost: () => import("@/components/AddPost"),
        EditPill: () => import("@/components/EditPill")
    },

    computed: {
        isMounted() {
            return this.$store.state.core.isMounted
        },

        checkAdmin() {
            console.log(this.user)
            if (!this.user.name) return false
            return this.pill.admins.some((admin => admin.name == this.user.name))
        },

        user() {
            return this.$store.state.auth.user
        }
    },

    data() {
        return {
            pill: {},
            edit: false,
            createDialog: false
        }
    },

    methods: {

        async savePill() {
            await this.$apollo.mutate({
                mutation: gql`mutation EditPill($name: ID!, $title: String, $writePermission: WritePermissionPills, $locale: Locale, $description: String, $banner: String, $avatar: String) {
                    editPill(name: $name, title: $title, writePermission: $writePermission, locale: $locale, description: $description, banner: $banner, avatar: $avatar) {
                        name, title, writePermission, locale, description, banner, avatar
                    }
                }`,
                variables: this.pill
            })
        }
    }
}
</script>