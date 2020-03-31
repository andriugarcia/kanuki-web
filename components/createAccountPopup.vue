<template lang="pug">
    v-card(v-if="step == 1", :style="$vuetify.breakpoint.mdAndUp ? 'border-radius: 24px' : 'border-radius: 24px 24px 0 0'")
        v-layout#createAccountPopup(align-start, style="height: 576px; background-color: #4F9CD1")
            v-flex(v-if="state == 'login' || $vuetify.breakpoint.mdAndUp", xs12, md6, style="height: inherit;")
                v-card(color="kyellow", light, flat, :style="$vuetify.breakpoint.mdAndUp ? 'height: 100%' : 'border-radius: 24px 24px 0 0'")
                    v-layout.py-2(v-if="!$vuetify.breakpoint.mdAndUp", justify-center, @click="state = 'register'")
                        b {{$t('signinPopup.notaccount')}}
                    v-card(color="kblue", flat, dark, :style="!$vuetify.breakpoint.mdAndUp ? 'border-radius: 24px 24px 0 0' : 'height: 100%'")
                        v-subheader {{$t('signin')}}
                        .pa-4
                            v-text-field(:label="$t('user')", v-model="user")
                            v-text-field.mb-12(:label="$t('password')", v-model="pass", type="password")
                            v-layout(style="position: absolute; bottom: 16px; left: 16px; right: 16px;")
                                v-btn.font-weight-bold.blue--text.text-truncate(block, rounded, depressed, color="white", @click="login") {{$t('signin')}}
            v-flex(v-if="state == 'register' || $vuetify.breakpoint.mdAndUp", xs12, md6)
                v-card(color="kblue", flat, dark, :style="$vuetify.breakpoint.mdAndUp ? 'height: 100%' : 'border-radius: 24px 24px 0 0' ")
                    v-layout.py-2(v-if="!$vuetify.breakpoint.mdAndUp", justify-center, @click="state = 'login'")
                        b {{$t('registerPopup.already')}}
                    v-card(color="kyellow", light, flat, :style="!$vuetify.breakpoint.mdAndUp ? 'border-radius: 24px 24px 0 0' : 'border-radius: 24px 0 0 24px'")
                        v-subheader {{$t('register')}}
                        v-list(color="transparent")
                            v-list-item
                                v-list-item-avatar
                                    v-icon mdi-heart
                                v-list-item-title(style="font-size: .9em") {{$t('registerPopup.vote')}}
                            v-list-item
                                v-list-item-avatar
                                    v-icon mdi-access-point
                                v-list-item-title(style="font-size: .9em") {{$t('registerPopup.follow')}}
                            v-list-item
                                v-list-item-avatar
                                    v-icon mdi-pencil
                                v-list-item-title(style="font-size: .9em") {{$t('registerPopup.create')}}
                        .pa-4
                            v-text-field(:label="$t('user')", v-model="user", color="black")
                            v-text-field(:label="$t('email')", v-model="email", color="black")
                            v-text-field(placeholder="Password", color="black", :type="visible ? 'text' : 'password'", v-model="pass", :append-icon="!visible ? 'mdi-eye' : 'mdi-eye-off'", @click:append="() => (visible = !visible)")
                            v-checkbox(:label="$t('registerPopup.uptodate')", color="black", v-model="subscribed")
                            v-btn.font-weight-bold.kyellow--text.text-truncate(block, rounded, depressed, @click="register", color="black") {{$t('register')}}
    v-card.pa-6(v-else, color="kyellow")
        v-layout(justify-space-between)
            b {{ getStepText() }}
        v-layout.py-6(v-if="step == 2", justify-center)
            div
                b ¿Cómo te llamas?
                v-text-field(value="Andrés García", color="black")
                b ¿Cual es tu email?
                v-text-field(value="mail@mail.com", color="black")
                b Una contraseña facil de recordar
                v-text-field(placeholder="Password", color="black", :type="visible ? 'text' : 'password'", v-model="pass", :append-icon="!visible ? 'mdi-eye' : 'mdi-eye-off'", @click:append="() => (visible = !visible)")
            
        div(v-else-if="step == 3")
            v-layout.my-6(align-center, column)
                v-avatar(:size="200", color="grey darken-2")
                v-btn.mt-4.font-weight-bold.kyellow--text.text-truncate(rounded, depressed, color="black") Cambiar Foto
        
        .my-6(v-else-if="step == 4")
            b Tu Biografía
            v-textarea(solo, auto-grow, placeholder="Cuentales algo interesante sobre ti a tus futuros seguidores, puede ser algo que te haga especial, algo a lo que te dediques, o simplemente cuentanos que te gustan los gatos...")
        div(v-else-if="step == 5")
            div Escoge las Revistas que sean de tu interés
            v-layout.mb-4(wrap)
                v-card.ma-1.pointer(v-for="i in 20", style="position: relative; height: 100px; max-width: 140px;", v-ripple, hover)
                    v-img(:src="require('@/assets/images/pill-default-banner.png')", style="width: 100%; height: 24px; object-fit: cover")
                        v-layout.mr-1(justify-end)
                            .ma-1.font-weight-bold.uns(style="font-size: .7em") 320K
                            v-icon(size="12") mdi-account
                    v-avatar.ml-2(style="position: absolute; top: 12px; left: 0", size="24")
                        v-img(:src="require('@/assets/images/kanuki-pill-avatar-default.png')")
                    .pa-2.pt-4
                        .font-weight-bold.uns(style="font-size: .8em") Test
                        .uns(style="font-size: .7em") Descripción
        div(v-else-if="step == 6")
            v-layout.my-12(v-if="!googleActivated", justify-space-around)
                div
                    b Buscar en mis contactos
                    div Conectate a Google para buscar contactos que ya tengan Kanuki
                v-btn.mt-4.font-weight-bold.kyellow--text.text-truncate(rounded, depressed, @click="googleActivated = true", color="black") 
                    v-icon.mr-1(small) mdi-google
                    div Buscar
            v-list(v-else, color="transparent", style="overflow-y: scroll; max-height: 70vh")
                v-list-item(v-for="i in 20")
                    v-list-item-avatar
                        v-img(:src="require('@/assets/images/kanuki-user-avatar-default.png')")
                    v-list-item-content
                        v-list-item-title Nombre del Usuario
                        v-list-item-subtitle 142 Followers
                    v-list-item-action
                        follow(:name="andres", block, :isUser="true")
        v-layout(v-else-if="step == 7", justify-center)
            .text-center(style="width: 400px")
                div(style="font-size: 1.6em") Actualizados nos sentimos más inteligentes
                div Activa las notificaciones para estar al día de tus artículos favoritos
                v-btn.mt-4.font-weight-bold.kyellow--text.text-truncate(rounded, depressed, color="black") Activar Notificaciones
        v-layout.my-4(v-else-if="step == 8", align-center, column)
            .text-center(style="width: 400px")
                div(style="font-size: 1.6em") ¡Ya está todo listo!
                div Estas son algunas cosas que puedes hacer en Kanuki
            v-layout.mt-4(align-start, fill-height, style="height:100%")
                v-flex(xs4, style="height: 200px")
                    v-card.mx-2.py-8.px-4.text-center(color="#00000010", flat, style="height: 100%")
                        v-layout(column, justify-center, align-center, style="height: 100%")
                            v-btn(fab, color="kblue", dark)
                                v-icon mdi-plus
                            .mt-4 Crea tus propios Artículos y Revistas
                v-flex(xs4, style="height: 200px")
                    v-card.mx-2.py-8.px-4.text-center(color="#00000010", flat, style="height: 100%")
                        v-layout(column, justify-center, align-center, style="height: 100%")
                            v-icon(large) mdi-antenna
                            .mt-4 Publica artículos en Revistas
                v-flex(xs4, style="height: 200px")
                    v-card.mx-2.py-8.px-4.text-center(color="#00000010", flat, style="height: 100%")
                        v-layout(column, justify-center, align-center, style="height: 100%")
                            follow
                            .mt-4 Sigue las revistas que te gusten
                v-flex(xs4, style="height: 200px")
                    v-card.mx-2.py-8.px-4.text-center(color="#00000010", flat, style="height: 100%")
                        v-layout(column, justify-center, align-center, style="height: 100%")
                            v-btn(fab, color="kred", dark)
                                v-icon mdi-bookmark
                            .mt-4 Guarda los Artículos que te gusten

        v-layout(justify-space-between)
            v-btn(text, @click="step-=1") Atras
            v-btn.font-weight-bold.kyellow--text.text-truncate(rounded, depressed, @click="step++", color="black") Siguiente


</template>

<script>
export default {
    components: {
        Follow: () => import("@/components/Follow")
    },
    computed: {
        subscribed: {
            get() {
                console.log(this.$store.state.auth.subscribed)
                return this.$store.state.auth.subscribed
            },
            set(value) {
                if (this.$store.state.auth.subscribed == false) {
                    this.initNotifications()
                }
            }
        }
    },

    data() {
        return {
            step: 2,
            googleActivated: false,
            state: "register",
            user: "",
            pass: "",
            email: "",
            visible: false
        }
    },

    methods: {
        login() {
            this.$store.dispatch("auth/login", {user: this.user, pass: this.pass})
            this.$emit("back")
        },
        register() {
            this.$store.dispatch("auth/register", {user: this.user, email: this.email, pass: this.pass})
            this.$emit("back")
        },

        getStepText() {
            switch(this.step) {
                case 2: 
                    return "Bienvenido a Kanuki"
                case 3:
                    return "Añade una foto de perfil"
                case 4:
                    return "Cuentanos quien eres"
                case 5:
                    return "¿Qué te gusta?"
                case 6:
                    return "Sigue a tus compañeros"
                case 7:
                    return "Activar Notificaciones"
            }
        },

        initNotifications() {
            console.log("Init")
            const self = this
            self.$OneSignal.push(function() {
                self.$OneSignal.showNativePrompt();
            });
        }
    }
}
</script>