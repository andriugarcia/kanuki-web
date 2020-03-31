<template lang="pug">
    #Routing
        v-layout(align-center)
            v-btn(icon, @click="$emit('back')")
                v-icon mdi-arrow-left
            .overline.ml-2 {{type}}
        #CreateCard
            v-layout.pa-3
                div(style="background-color: #ff6384; border-radius: 12px; height: 80px; width: 80px")
                .ml-3
                    .font-weight-bold {{type}}
                    div u/user
                    div 4,4★
            .pa-3
                .font-weight-bold Descripción
                div Descripcion de la template
                v-btn.mt-5.font-weight-bold(block, rounded, dark, color="kblue", @click="create") Crear
            

</template>

<script>

export default {

    methods: {
        async create() {
            this.$emit("create", this.type)
        },
    },

    props: ["type"]
}
</script>