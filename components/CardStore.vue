<template lang="pug">
    #Routing
        #CardStore(v-if="type == ''")
            v-layout(align-center)
                v-btn(icon)
                    v-icon mdi-arrow-left
                v-text-field(solo, hide-details, rounded, label="Buscar...", append-icon="mdi-magnify")
            .mt-5.font-weight-bold Últimos usados
            v-layout
                .pa-2.hover.ml-2(style="border-radius: 12px", @click="type = 'article'")
                    div(style="background-color: #ff6384; border-radius: 12px; height: 80px; width: 80px")
                    .mt-2.font-weight-bold Titulo
                    div 4,4★
        create-card#CreateCard(v-else, :type="type")
</template>

<script>
export default {
    components: {
        CreateCard: () => import("@/components/CreateCard")
    },

    data() {
        return {
            type: ""
        }
    }
}
</script>