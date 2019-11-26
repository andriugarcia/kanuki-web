<template lang="pug">
    #Routing
        #CardStore(v-if="type == ''")
            v-layout(align-center)
                v-btn(icon, @click="$emit('back')")
                    v-icon mdi-arrow-left
                v-text-field.ml-2(hide-details, rounded, outlined, dense, placeholder="Buscar...", append-icon="mdi-magnify")
            .mt-5.font-weight-bold Últimos usados
            v-layout
                .pa-2.hover.ml-2(style="border-radius: 12px", @click="type = 'article'")
                    div(style="background-color: #ff6384; border-radius: 12px; height: 80px; width: 80px")
                    .mt-2.font-weight-bold Artículo
                    div 4,4★
                .pa-2.hover.ml-2(style="border-radius: 12px", @click="type = 'youtube'")
                    div(style="background-color: #ff6384; border-radius: 12px; height: 80px; width: 80px")
                    .mt-2.font-weight-bold Youtube
                    div 4,4★
                .pa-2.hover.ml-2(style="border-radius: 12px", @click="type = 'poll'")
                    div(style="background-color: #ff6384; border-radius: 12px; height: 80px; width: 80px")
                    .mt-2.font-weight-bold Encuesta
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