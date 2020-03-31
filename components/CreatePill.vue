<template lang="pug">
    #createPill
        v-layout(align-center)
            v-btn(icon, @click="$emit('back')")
                v-icon mdi-arrow-left
            .overline.ml-2 Crear Comunidad
        v-text-field(placeholder="pill", v-model="title", :error-messages="exists ? 'Ya existe una pill con ese nombre' : ''")
            v-chip.font-weight-bold(slot="prepend", dark, small, color="kred") p/
            v-btn.font-weight-bold(slot="append-outer", @click="create", rounded, small, dark, color="kred") Crear
</template>

<script>

import gql from "graphql-tag"
import slugify from "slugify"

export default {
    data() {
        return {
            title: "",
            exists: false
        }
    },

    methods: {
        create() {
            const self = this
            this.exists = false
            this.$apollo.mutate({
                mutation: gql`mutation CreatePill($name: String!, $title: String!) {
                    createPill(name: $name, title: $title) {
                        name
                    }
                }`,
                variables: {
                    name: slugify(this.title),
                    title: this.title
                }
            }).then(({data}) => {
                self.$router.push({path: `/p/${data.createPill.name}`})
                this.$emit('back')
            })
            .catch((error) => {
                if (error.graphQLErrors.map(x => x.message)[0].endsWith('already exists')) {
                    self.exists = true
                }

            })

            
        }
    }
}
</script>