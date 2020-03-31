<template lang="pug">
    #libraryRouting
        #library.pa-3(v-if="autenticate")
            v-layout(align-center)
                v-icon.pa-1(v-if="routing == '' && $vuetify.breakpoint.mdAndUp") mdi-folder-outline
                v-btn(v-else-if="routing != ''", icon, @click="route('')")
                    v-icon mdi-arrow-left
                v-btn(v-else, icon, @click="$emit('back')")
                    v-icon mdi-arrow-left
                .overline.ml-2.uns {{ sectionName }}
                v-spacer
                v-btn.text-capitalize.font-weight-bold(color="kblue", rounded, small, outlined) Editar Perfil
            div(v-if="routing == ''")
                v-layout
                    v-flex.font-weight-bold.hover.py-5.uns(xs4, style="border-radius: 24px", @click="route('followers')")
                        .text-center(style="font-size: 1.8em") {{user.followers.length}}
                        .text-center {{$t('library.followers')}}
                    v-flex.font-weight-bold.hover.py-5.uns(xs4, style="border-radius: 24px", @click="route('pills')")
                        .text-center(style="font-size: 1.8em") {{user.adminInPills.length}}
                        .text-center {{$t('library.moderating')}}
                    v-flex.font-weight-bold.hover.py-5.uns(xs4, style="border-radius: 24px", @click="route('following')")
                        .text-center(style="font-size: 1.8em") {{user.following.length}}
                        .text-center {{$t('library.followed')}}
                v-list(color="transparent")
                    v-list-item(@click="route('likes')")
                        v-list-item-avatar
                            v-icon mdi-heart
                        v-list-item-content
                            v-list-item-title {{$t('library.saved')}}
                        v-list-item-action
                            v-chip.font-weight-bold(color="kblue", small, dark) {{user.likes.length}}
                    v-list-item(@click="route('cards')")
                        v-list-item-avatar
                            v-icon mdi-cards
                        v-list-item-content
                            v-list-item-title {{$t('library.created')}}
                        v-list-item-action
                            v-chip.font-weight-bold(color="kblue", small, dark) {{user.cards.length}}
                    v-list-item(@click="route('followingPills')")
                        v-list-item-avatar
                            v-icon mdi-pill
                        v-list-item-content
                            v-list-item-title {{$t('library.followedPills')}}
                        v-list-item-action
                            v-chip.font-weight-bold(color="kred", small, dark) {{user.followingPills.length}}
                    v-list-item(@click="route('published')")
                        v-list-item-avatar
                            v-icon mdi-source-fork
                        v-list-item-content
                            v-list-item-title {{$t('library.published')}}
                        v-list-item-action
                            v-chip.font-weight-bold(color="kyellow", small) {{user.publications.length}}
            followers(v-else-if="routing == 'followers'", @back="$emit('back')")
            pills(v-else-if="routing == 'pills'", @back="$emit('back')")
            cards(v-else-if="routing == 'cards'", @back="$emit('back')")
            following(v-else-if="routing == 'following'", @back="$emit('back')")
            likes(v-else-if="routing == 'likes'", @back="$emit('back')")
            created(v-else-if="routing == 'created'", @back="$emit('back')")
            published(v-else-if="routing == 'published'", @back="$emit('back')")
            following-pills(v-else-if="routing == 'followingPills'", @back="$emit('back')")
        #autenticate.pa-1(v-else)
            login
            register.mt-2
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
        login: () => import("@/components/Login"),
        register: () => import("@/components/Register"),
    },

    computed: {
        user() {
            return this.$store.state.auth.user
        },

        autenticate() {
            return !this.isEmpty(this.$store.state.auth.user)
        },

        sectionName() {
            switch (this.routing) {
                case '':
                    return this.$t('library.header')
                case 'followers':
                    return this.$t('library.followers')
                case 'pills':
                    return this.$t('pills')
                case 'cards':
                    return this.$t('library.created')
                case 'following':
                    return this.$t('library.followed')
                case 'likes':
                    return this.$t('library.saved')
                case 'created':
                    return this.$t('library.created')
                case 'published':
                    return this.$t('library.published')
                case 'followingPills':
                    return this.$t('library.followedPills')
                default:
                    return "ERROR"
                

            }
        }
    },

    data() {
        return {
            routing: ""
        }
    },

    methods: {
        route(r) {
            this.routing = r
        }
    }
}
</script>