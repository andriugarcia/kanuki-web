<template lang="pug">
    #notifications.pa-2
        v-layout(align-center)
            v-btn(icon)
                v-icon mdi-arrow-left
            .overline.ml-2 NOTIFICACIONES
            v-spacer
            v-btn.font-weight-bold.text-capitalize(rounded, small, dark, style="letter-spacing: 0", depressed, @click="logout", color="kred") Cerrar Sesión
        v-layout.ma-2
            v-avatar(:size="32")
                v-img(:src="user.avatar")
            v-chip.ml-3.font-weight-bold(color="kblue", dark, small) u/{{user.name}}
            v-spacer
            v-btn.font-weight-bold.text-capitalize(text, color="kblue", style="letter-spacing: 0") Ver Perfil
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
    computed: {
        user() {
            return this.$store.state.auth.user
        }
    },

    methods: {
        logout() {
            this.$store.dispatch("auth/logout")
        }
    }
}
</script>