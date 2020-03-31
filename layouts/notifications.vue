<template lang="pug">
    #routing
        #notifications.pa-2(v-if="autenticate")
            v-layout(align-center)
                v-btn(icon, @click="$emit('back')")
                    v-icon mdi-arrow-left
                .overline.ml-2 {{$t('notifications.header')}}
                v-spacer
                v-btn.font-weight-bold.text-capitalize(rounded, small, dark, style="letter-spacing: 0", depressed, @click="logout", color="kred") {{$t('notifications.signout')}}
            v-layout.ma-2
                v-avatar(:size="32")
                    v-img(:src="user.avatar")
                v-chip.ml-1.font-weight-bold.uns(color="kblue", dark, small) u/{{user.name}}
                v-spacer
                v-btn.font-weight-bold.text-capitalize(text, color="kblue", @click="goToProfile", style="letter-spacing: 0") Editar Perfil
            v-list(color="transparent")
                v-list-item(two-line, @click="$emit('back')")
                    v-list-item-avatar
                        v-avatar(color="indigo")
                    v-list-item-content
                        v-list-item-title cardname
                        v-list-item-subtitle {{$t('notifications.published')}}
                    v-list-item-action
                        v-btn(icon)
                            v-icon mdi-close
        #autenticate(v-else)
            login
            register
</template>

<script>
export default {
    components: {
        login: () => import("@/components/Login"),
        register: () => import("@/components/Register"),
    },

    computed: {
        user() {
            return this.$store.state.auth.user
        },

        autenticate() {
            return !this.isEmpty(this.$store.state.auth.user)
        }
    },

    methods: {
        logout() {
            this.$emit('back')
            this.$store.dispatch("auth/logout")
        },

        goToProfile() {
            this.$router.push({path: `/u/${this.user.name}`})
            this.$emit('back')
        }
    }
}
</script>