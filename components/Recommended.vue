<template lang="pug">
    #Recommended
        v-layout(justify-space-between)
            v-subheader Otros Artículos de &nbsp<b>{{pill.name ? `${pill.name}` : `${user}`}}</b>
            v-chip.font-weight-bold(:color="!isEmpty(pill) ? 'kred' : 'kblue'", @click="routing", small, dark) Ver {{ !isEmpty(pill) ? 'Revista' : 'Autor' }}
        masonry(:cols="{default: 2, 960: 1}")
            post(v-for="(recommendation, i) in recommended", :key="i", :card="recommendation.card", :pill="recommendation.pill")
</template>

<script>
import gql from "graphql-tag"
import Post from "@/components/post"

export default {
    components: {
        Post
    },

    data() {
        return {
            recommended: []
        }
    },

    async mounted() {
        let query
        let key
        let subkey
        if (!this.isEmpty(this.pill)) {
            query = gql`query GetPill($pill: String!) {
                getPill(name: $pill) {
                    publications {
                        pill {
                            name, avatar
                        },
                        card {
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

                    }
                    
                }
            }`

            key = "getPill"
            subkey = "publications"
        }

        else {
            query = gql`query GetUser($user: String!) {
                getUser(name: $user) {
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
                        },
                        createdAt
                    }
                }
            }`
            key = "getUser"
            subkey = "cards"
        }
        let {data} = await this.$apollo.query({
            query,
            variables: {
                pill: this.pill.name,
                user: this.user
            }
        })
        console.log(data)
        this.recommended = data[key][subkey]
        
    },

    methods: {
        routing() {
            if (!this.isEmpty(this.pill)) {
                this.$router.push({path: `/p/${this.pill.name}`})
            }
            else {
                this.$router.push({path: `/u/${this.user}`})
            }
        }
    },

    props: ["user", "pill"]
}
</script>