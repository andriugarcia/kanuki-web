<template lang="pug">
    v-btn(:color="!isFollowing && !block ? '#00000015' : isUser ? 'kblue' : 'kred'", :dark="isFollowing || block", :outlined="block && !isFollowing", :block="block", depressed, rounded, small, @click.stop="follow")
        v-icon(small) {{ isFollowing ? 'mdi-check' : this.isUser ? 'mdi-account-circle-outline' : 'mdi-pill'}}
        .font-weight-bold(style="letter-spacing: 0; font-size: .8em") {{isFollowing ? 'Following' : 'Follow'}}
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

        isFollowing() {
            if (!this.following) return false
            return this.following.some(pill => pill.name == this.name)
        }
    },

    methods: {
        async follow() {
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
