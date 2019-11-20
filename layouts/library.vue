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
                        .text-center(style="font-size: 1.8em") {{user.followingPills.length}}
                        .text-center Comunidades
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
                    //- v-list-item(@click="routing = 'pills'")
                        v-list-item-avatar
                            v-icon mdi-pill
                        v-list-item-content
                            v-list-item-title Pills que has seguido
                        v-list-item-action
                            v-chip.font-weight-bold(color="kred", small, dark) {{user..length}}
                    v-list-item(@click="routing = 'published'")
                        v-list-item-avatar
                            v-icon mdi-source-fork
                        v-list-item-content
                            v-list-item-title Pills donde has publicado
                        v-list-item-action
                            v-chip.font-weight-bold(color="kyellow", small) {{user.publications.length}}
            followers(v-else-if="routing == 'followers'")
            pills(v-else-if="routing == 'pills'")
            following(v-else-if="routing == 'following'")
            likes(v-else-if="routing == 'likes'")
            created(v-else-if="routing == 'created'")
            published(v-else-if="routing == 'published'")
</template>

<script>
export default {
    components: {
        followers: () => import("@/layouts/followers"),
        pills: () => import("@/layouts/pills"),
        following: () => import("@/layouts/following"),
        likes: () => import("@/layouts/likes"),
        created: () => import("@/layouts/created"),
        published: () => import("@/layouts/published"),
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
                case 'following':
                    return "Seguidos"
                case 'likes':
                    return "Guardados"
                case 'created':
                    return "Posts Creados"
                case 'published':
                    return "Posts Publicados"
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