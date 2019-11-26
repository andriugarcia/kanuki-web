<template lang="pug">
    #libraryRouting
        #library.pa-3
            v-layout(align-center)
                v-icon.pa-1(v-if="routing == ''") mdi-folder-outline
                v-btn(v-else, icon, @click="routing = ''")
                    v-icon mdi-arrow-left
                .overline.ml-2 {{ sectionName }}
            div(v-if="routing == ''")
                v-layout
                    v-flex.font-weight-bold.hover.py-5(xs4, style="border-radius: 24px", @click="routing = 'followers'")
                        .text-center(style="font-size: 1.8em") {{user.followers.length}}
                        .text-center Seguidores
                    v-flex.font-weight-bold.hover.py-5(xs4, style="border-radius: 24px", @click="routing = 'pills'")
                        .text-center(style="font-size: 1.8em") {{user.adminInPills.length}}
                        .text-center Moderando
                    v-flex.font-weight-bold.hover.py-5(xs4, style="border-radius: 24px", @click="routing = 'following'")
                        .text-center(style="font-size: 1.8em") {{user.following.length}}
                        .text-center Seguidos
                v-list(color="transparent")
                    v-list-item(@click="routing = 'likes'")
                        v-list-item-avatar
                            v-icon mdi-heart
                        v-list-item-content
                            v-list-item-title Cards que has guardado
                        v-list-item-action
                            v-chip.font-weight-bold(color="kblue", small, dark) {{user.likes.length}}
                    v-list-item(@click="routing = 'cards'")
                        v-list-item-avatar
                            v-icon mdi-cards
                        v-list-item-content
                            v-list-item-title Cards que has creado
                        v-list-item-action
                            v-chip.font-weight-bold(color="kblue", small, dark) {{user.cards.length}}
                    v-list-item(@click="routing = 'followingPills'")
                        v-list-item-avatar
                            v-icon mdi-pill
                        v-list-item-content
                            v-list-item-title Pills que has seguido
                        v-list-item-action
                            v-chip.font-weight-bold(color="kred", small, dark) {{user.followingPills.length}}
                    v-list-item(@click="routing = 'published'")
                        v-list-item-avatar
                            v-icon mdi-source-fork
                        v-list-item-content
                            v-list-item-title Pills donde has publicado
                        v-list-item-action
                            v-chip.font-weight-bold(color="kyellow", small) {{user.publications.length}}
            followers(v-else-if="routing == 'followers'")
            pills(v-else-if="routing == 'pills'")
            cards(v-else-if="routing == 'cards'")
            following(v-else-if="routing == 'following'")
            likes(v-else-if="routing == 'likes'")
            created(v-else-if="routing == 'created'")
            published(v-else-if="routing == 'published'")
            following-pills(v-else-if="routing == 'followingPills'")
</template>

<script>
export default {
    components: {
        followers: () => import("@/layouts/followers"),
        pills: () => import("@/layouts/pills"),
        cards: () => import("@/layouts/cards"),
        following: () => import("@/layouts/following"),
        likes: () => import("@/layouts/likes"),
        created: () => import("@/layouts/created"),
        published: () => import("@/layouts/published"),
        followingPills: () => import("@/layouts/followingPills"),
    },

    computed: {
        user() {
            return this.$store.state.auth.user
        },

        sectionName() {
            switch (this.routing) {
                case '':
                    return "Biblioteca"
                case 'followers':
                    return "Seguidores"
                case 'pills':
                    return "Comunidades"
                case 'cards':
                    return "Cards que has creado"
                case 'following':
                    return "Seguidos"
                case 'likes':
                    return "Guardados"
                case 'created':
                    return "Posts Creados"
                case 'published':
                    return "Posts Publicados"
                case 'followingPills':
                    return "Pills que estás siguiendo"
                default:
                    return "ERROR"
                

            }
        }
    },

    data() {
        return {
            routing: ""
        }
    }
}
</script>