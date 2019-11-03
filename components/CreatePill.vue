<template lang="pug">
    #createPill
        v-layout(align-center)
            v-btn(icon, @click="$emit('back')")
                v-icon mdi-arrow-left
            .overline.ml-2 Crear Comunidad
        v-text-field(placeholder="pill")
            v-chip.font-weight-bold(slot="prepend", dark, small, color="kred") p/
            v-btn.font-weight-bold(slot="append-outer", rounded, small, dark, color="kblue") Crear
</template>