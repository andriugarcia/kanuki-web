<template lang="pug">
    v-card.pa-2
        v-layout(align-center)
            v-btn(icon, @click="$emit('back')")
                v-icon mdi-close
            .overline.ml-2 {{$t('publish.header')}}
        p {{$t('publish.select')}}
        v-alert(type="error", :value="true", outlined) {{$t('publish.notAllowed')}}
        v-list.mb-12
            v-list-item(v-for="(pill, i) in pills", :key="i", v-if="i < 5", @click="")
                v-list-item-avatar
                    v-avatar(color="indigo", :size="40")
                v-list-item-title.font-weight-bold p/{{pill.name}}
                
        v-text-field.pa-2(hide-details, solo, v-model="pill", flat, style="position: absolute; bottom: 0; left: 0; right: 0", :label="$t('pill.header')")
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

    computed: {
        pills() {
            return this.$store.state.auth.user.adminInPills
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