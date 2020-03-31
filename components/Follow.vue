<template lang="pug">
    v-btn(:color="!isFollowing && !block ? '#00000015' : isUser ? 'kblue' : 'kred'", :dark="isFollowing || block", :outlined="block && !isFollowing", :block="block", depressed, rounded, small, @click.stop="follow")
        v-icon(small) {{ isFollowing ? 'mdi-check' : this.isUser ? 'mdi-account-circle-outline' : 'mdi-pill'}}
        .font-weight-bold.uns(style="letter-spacing: 0; font-size: .8em") {{ getFollowWord() }}
</template>

<script>

import gql from "graphql-tag"

export default {
    computed: {
        following() {
            if (this.isUser) {
                return this.$store.state.auth.user.following
            }
            return this.$store.state.auth.user.followingPills
        },

        openAccountPopup() {
            return this.$store.state.core.openAccountPopup
        },

        isFollowing() {
            if (!this.following) return false
            return this.following.some(pill => pill.name == this.name)
        }
    },

    methods: {
        getFollowWord() {
            if (this.isUser) {
                return this.isFollowing ? this.$t('following') : this.$t('follow')
            }
            return this.isFollowing ? "Suscribed" : "Suscribe"
        },
        async follow() {
            if (!this.$store.state.auth.logged) {
                this.$store.commit('core/setOpenAccountPopup', true)
                return
            }

            let mutation

            if (!this.isUser) {
                if (this.isFollowing) {
                    mutation = gql`mutation UnfollowPill($name: String!) {
                        unfollowPill(name: $name) {
                            followingPills {
                                name,
                                avatar
                            }
                        }
                    }`
                }
                else {
                    mutation = gql`mutation FollowPill($name: String!) {
                        followPill(name: $name) {
                            followingPills {
                                name,
                                avatar
                            }
                        }
                    }`
                }
            }
            else {
                if (this.isFollowing) {
                    mutation = gql`mutation UnfollowUser($name: String!) {
                        unfollowUser(name: $name) {
                            following {
                                name,
                                avatar
                            }
                        }
                    }`
                }
                else {
                    mutation = gql`mutation FollowUser($name: String!) {
                        followUser(name: $name) {
                            following {
                                name,
                                avatar
                            }
                        }
                    }`
                }

            }

            console.log(this.name)

            let {data} = await this.$apollo.mutate({
                mutation,
                variables: {
                    name: this.name,
                }
            })

            const mergeUser = (this.isUser) ? data.followUser || data.unfollowUser : data.followPill || data.unfollowPill

            this.$store.commit("auth/mergeUser", mergeUser)
        }
    },

    props: {
        name: String,
        isUser: false,
        block: Boolean
    }
}
</script>
