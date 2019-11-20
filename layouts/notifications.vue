<template lang="pug">
    #notifications.pa-2
        v-layout(align-center)
            v-btn(icon)
                v-icon mdi-arrow-left
            .overline.ml-2 NOTIFICACIONES
        v-list(color="transparent")
            v-list-item(two-line)
                v-list-item-avatar
                    v-avatar(color="indigo")
                v-list-item-content
                    v-list-item-title cardname
                    v-list-item-subtitle Ha sido publicada en p/pill
                v-list-item-action
                    v-btn(icon)
                        v-icon mdi-close
</template>

<script>
export default {
    
}
</script>