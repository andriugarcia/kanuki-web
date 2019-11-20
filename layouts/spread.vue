<template lang="pug">
    v-card.pa-2
        v-layout(align-center)
            v-btn(icon, @click="$emit('back')")
                v-icon mdi-close
            .overline.ml-2 Spread Community
        v-list.mb-12
            v-list-item(v-for="i in 10", :key="i", @click="")
                v-list-item-avatar
                    v-avatar(color="indigo")
                v-list-item-title p/pill
                
        v-text-field.pa-2(hide-details, solo, v-model="pill", flat, style="position: absolute; bottom: 0; left: 0; right: 0", label="pill")
            v-chip.font-weight-bold(slot="prepend-inner", color="kred", dark) p/
            v-btn(slot="append", fab, :loading="loading", dark, small, color="kblue", @click="createPublication")
                v-icon(small) mdi-source-fork
</template>

<script>

import gql from "graphql-tag"

export default {
    data() {
        return {
            pill: "",
            loading: false,
        }
    },

    methods: {
        async createPublication() {
            this.loading = true
            await this.$apollo.mutate({
                mutation: gql`mutation CreatePublication($name: String!, $author: String!, $pill: String!) {
                    createPublication(cardName: $name, cardAuthor: $author, pill: $pill) {
                        card {
                            name
                        }
                    }
                }`,
                variables: {
                    name: this.card.name,
                    author: this.card.author.name,
                    pill: this.pill
                }
            })
            this.loading = false

        }
    },

    props: ["card"]
}
</script>