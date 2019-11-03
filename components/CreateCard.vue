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
            v-switch(label="Publicar también en p/pill", color="kblue")
            v-text-field(placeholder="Titulo")
                v-btn(slot="append-outer", small, rounded, dark, color="kblue") Crear
            

</template>

<script>
export default {
    data() {
        return {
            creating: false
        }
    }
}
</script>