<template lang="pug">
    v-card.pa-2#createSwitch(style="border-radius: 24px 24px 0 0")
        v-layout#create(v-if="routing == ''")
            v-flex.mr-1.hover(xs6, @click="routing = 'pill'", style="border-radius: 24px; border: 1px solid #00000015; height: 120px")
                v-layout.pa-2.pt-12.pl-2(column, align-start, justify-end)
                    .font-weight-bold Comunidad
                    div Crea comunidades por temáticas
            v-flex.ml-1.hover(xs6, @click="routing = 'card'", style="border-radius: 24px; border: 1px solid #00000015; height: 120px")
                v-layout.pa-2.pt-12.pl-2(column, align-start, justify-end)
                    .font-weight-bold Página
                    div Crea contenido para compartir
        create-pill(v-else-if="routing == 'pill'", @back="routing = ''")
        create-post(v-else-if="routing == 'card'", @back="routing = ''")
</template>

<script>
export default {
    components: {
        CreatePill: () => import("@/components/CreatePill"),
        CreatePost: () => import("@/components/CreatePost"),
    },

    data() {
        return {
            routing: ""
        }
    }
}
</script>

<style lang="scss" scoped>
    #createSwitch {
        transition: all 1s;
    }
</style>