<template lang="pug">
    #libraryRouting
        #library.pa-3(v-if="routing == ''")
            v-layout(align-center)
                v-btn(icon)
                    v-icon mdi-arrow-left
                .overline.ml-2 BIBLIOTECA
            v-layout
                v-flex.font-weight-bold.hover.py-5(xs4, style="border-radius: 24px", @click="routing = 'followers'")
                    .text-center(style="font-size: 1.8em") 32
                    .text-center Seguidores
                v-flex.font-weight-bold.hover.py-5(xs4, style="border-radius: 24px", @click="routing = 'pills'")
                    .text-center(style="font-size: 1.8em") 32
                    .text-center Pills
                v-flex.font-weight-bold.hover.py-5(xs4, style="border-radius: 24px", @click="routing = 'following'")
                    .text-center(style="font-size: 1.8em") 32
                    .text-center Seguidos
            v-list(color="transparent")
                v-list-item(@click="routing = 'likes'")
                    v-list-item-avatar
                        v-icon mdi-heart
                    v-list-item-content
                        v-list-item-title Cards que has guardado
                v-list-item(@click="routing = 'created'")
                    v-list-item-avatar
                        v-icon mdi-cards
                    v-list-item-content
                        v-list-item-title Cards que has creado
                v-list-item(@click="routing = 'published'")
                    v-list-item-avatar
                        v-icon mdi-pill
                    v-list-item-content
                        v-list-item-title Pills donde has publicado
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

    data() {
        return {
            routing: ""
        }
    }
}
</script>