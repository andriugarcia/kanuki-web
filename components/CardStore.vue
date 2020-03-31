<template lang="pug">
    #Routing
        #CardStore(v-if="type == ''")
            v-layout(align-center)
                v-btn(icon, @click="$emit('back')")
                    v-icon mdi-arrow-left
                v-text-field.ml-2(hide-details, rounded, outlined, dense, placeholder="Buscar...", append-icon="mdi-magnify")
            .mt-5.font-weight-bold Últimos usados
            v-layout(wrap)
                .pa-2.hover.ml-2(v-for="(component, i) in components", :key="i", style="border-radius: 12px", @click="type = component.type")
                    div(style="background-color: #ff6384; border-radius: 12px; height: 80px; width: 80px")
                    .mt-2.font-weight-bold {{component.name}}
                    div {{component.stars}}★
        create-card#CreateCard(v-else, :type="type", @create="createEvent", @back="type = ''")
</template>

<script>
export default {
    components: {
        CreateCard: () => import("@/components/CreateCard")
    },

    data() {
        return {
            type: "",
            components: [
                {
                    name: "Articulo",
                    stars: 4.4,
                    type: "article"
                },
                {
                    name: "Youtube",
                    stars: 4.4,
                    type: "youtube"
                },
                {
                    name: "Encuesta",
                    stars: 4.4,
                    type: "poll"
                },
                {
                    name: "Info. Autor",
                    stars: 4.4,
                    type: "author"
                },
                {
                    name: "Imagen",
                    stars: 4.4,
                    type: "image"
                },
                {
                    name: "Shared list",
                    stars: 4.4,
                    type: "shared-list"
                },
                // {
                //     name: "Enlace",
                //     stars: 4.4,
                //     type: "link-preview"
                // },
                {
                    name: "Portada",
                    stars: 4.4,
                    type: "cover"
                },
                // {
                //     name: "Instagram",
                //     stars: 4.4,
                //     type: "instagram-feed"
                // },

            ]
        }
    },

    methods: {
        createEvent(event) {
            this.type = ""
            this.$emit("create", event)
        }
    }
}
</script>