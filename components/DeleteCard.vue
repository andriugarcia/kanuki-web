<template lang="pug">
    v-card.pa-2
        v-layout(align-center)
            v-btn(icon, @click="$emit('back')")
                v-icon mdi-close
            .overline.ml-2.uns Deleting {{ name }}
        v-alert.uns(type="warning", :value="true", outlined) Al eliminar esta card, también se borrará en todas las comunidades donde se ha compartido
        .mt-2 Escribe <b>{{name}}</b> para eliminarla
        v-text-field(placeholder="Nombre de la card")
        v-btn.font-weight-bold(block, color="red", rounded, dark) Eliminar Post

</template>

<script>
export default {
    props: ["name"]
}
</script>