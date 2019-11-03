<template lang="pug">
    v-layout.mt-5(wrap)
        v-flex(xs12, md8)
            v-layout.ma-3(align-center)
                v-avatar(color="indigo")
                .font-weight-bold.ml-2 v/versy
                v-spacer
                v-btn(icon, color="kred")
                    v-icon mdi-magnify
            masonry(:cols="{default: 2, 960: 1}")
                post(v-for="i in 5", :key="i")
        v-flex(xs12, md4)
</template>

<script>
import Post from "@/components/Post"
import gql from "graphql-tag"

export default {
    async asyncData({app, store}) {
        let client = app.apolloProvider.defaultClient

        let data = await client.query({
            query: gql`query {
                timeline {
                    __typename
                    ...on Publication {
                        card {
                            name
                        }
                    }
                    ...on Card {
                        name
                    }
                }
            }`
        })

        console.log(data.data)
    },

    components: {
        Post
    },

    data() {
        return {}
    }
}
</script>