<template lang="pug">
    #Routing
        v-layout(align-center)
            v-btn(icon, @click="$emit('back')")
                v-icon mdi-arrow-left
            .overline.ml-2 Template
        #CreateCard(v-if="!creating")
            v-layout.pa-3
                div(style="background-color: #ff6384; border-radius: 12px; height: 80px; width: 80px")
                .ml-3
                    .font-weight-bold Template
                    div u/user
                    div 4,4★
            .pa-3
                .font-weight-bold Descripción
                div Descripcion de la template
                v-btn.mt-5.font-weight-bold(block, rounded, dark, color="kblue", @click="creating = true") Crear
        #CardName.pa-3(v-else)
            v-switch(v-if="$route.params.pill", v-model="publish", :label="'Publicar también en p/' + $route.params.pill", color="kred")
            v-text-field(v-model="title", placeholder="Titulo")
                v-btn.font-weight-bold(slot="append-outer", small, @click="create", rounded, dark, color="kblue") Crear
            

</template>

<script>

import gql from "graphql-tag"
import slugify from "slugify"

export default {
    data() {
        return {
            title: "",
            creating: false,
            publish: true
        }
    },

    methods: {
        async create() {
            console.log("Create")
            let {data} = await this.$apollo.mutate({
                mutation: gql`mutation CreateCard($name: String!, $title: String!, $type: String!) {
                    createCard(name: $name, title: $title, content: "{}" type: $type) {
                        name,
                        title,
                        karma,
                        type,
                        shareCount,
                        commentsCount,
                        content,
                        author {
                            name
                        }                    }
                }`,
                variables: {
                    name: slugify(this.title, {
                        lower:true
                    }),
                    title: this.title,
                    type: this.type
                }
            })

            this.$store.state.auth.user.cards.unshift(data.createCard)

            if (this.publish) {
                await this.spread(data.createCard)
                this.$router.push({path: `/p/${this.$route.params.pill}/${data.createCard.author.name}/${data.createCard.name}`})
            }
            else {
                this.$router.push({path: `/u/${data.createCard.author.name}/${data.createCard.name}`})
            }

            console.log("Create completed", data.createCard)
        },

        async spread(card) {
            let {data} = await this.$apollo.mutate({
                mutation: gql`mutation CreatePublication($name: String!, $author: String!, $pill: String!) {
                    createPublication(cardName: $name, cardAuthor: $author, pill: $pill) {
                        pill {
                            name
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
                                name
                            }
                        }
                    }
                }`,
                variables: {
                    name: card.name,
                    author: card.author.name,
                    pill: this.$route.params.pill
                }
            })

            this.$store.state.auth.user.unshift(data.createPublication)
        },
    },

    props: ["type"]
}
</script>