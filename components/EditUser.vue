<template lang="pug">
    #EditUser.px-4.pt-12
        v-layout(align-center, style="margin-top: -60px")
            v-hover
                template(v-slot:default="{ hover }")
                    v-avatar(:size="80")
                        v-img(:src="require('@/assets/images/kanuki-user-avatar-default.png')")
                        v-fade-transition
                            v-overlay(v-if="hover", absolute)
                                v-icon mdi-pencil
                        input.input(type="file")
            v-card.ml-3.pa-3(style="border-radius: 24px;")
                .font-weight-bold u/{{user.name}}
        v-layout.mt-3(align-center)
            .font-weight-bold.mr-6 Email
            v-text-field(v-model="user.email")
        v-layout.mt-3(align-center)
            .font-weight-bold.mr-6 Idioma 
            v-select.font-weight-bold(color="#00000015", v-model="lang", :items="languages", style="width: 100%")
        .mt-6.font-weight-bold Biografía
        v-textarea.mt-2(v-model="user.bio", solo, rounded, auto-grow)
        b Sincronizar con tu Blog
        div Introduce la url de tu Blog para traerte los artículos de tu Blog automaticamente a Kanuki
        v-text-field.mt-4(solo, single-line, rounded, placeholder="Link a tu Blog")
        v-radio(label="Importar todos los artículos ya creados")
        v-radio(label="Sincronizar con mi blog para subir a Kanuki automaticamente")
        v-btn.my-4(color="kblue", rounded, block, dark) Sincronizar con mi blog
        b Sincronizar con Redes Sociales
        div Vincula tus diferentes redes y avisa automaticamente cuando subas una nueva Página
        v-layout.mt-2(wrap)
            v-card.mx-2.pa-5.text-center(flat, color="transparent", @click="")
                v-icon(large) mdi-twitter
                div Twitter
            v-card.mx-2.pa-5.text-center(flat, color="transparent", @click="")
                v-icon(large) mdi-youtube
                div YouTube
            v-card.mx-2.pa-5.text-center(flat, color="transparent", @click="")
                v-icon(large) mdi-facebook
                div Facebook
            v-card.mx-2.pa-5.text-center(flat, color="transparent", @click="")
                v-icon(large) mdi-instagram
                div Instagram
            v-card.mx-2.pa-5.text-center(flat, color="transparent", @click="")
                v-icon(large) mdi-linkedin
                div Linkedin
        v-layout.my-6(justify-space-around)
            v-flex(xs5, @click="$emit('cancel')")
                v-btn.font-weight-bold(large, rounded, dark, block, color="red") Cancelar
            v-flex(xs5, @click="$emit('save')")
                v-btn.font-weight-bold(large, rounded, dark, block, color="black") Guardar


</template>

<script>

import Follow from "@/components/Follow"

export default {
    components: {
        Follow
    },

    computed: {

        lang: {
            get() {
                switch (this.user.locale) {
                    case "es":
                        return "Castellano"
                    case "en":
                        return "English"
                    default: 
                        return "Multi"
                }

            },

            set(value) {
                switch (value) {
                    case "Castellano":
                        this.user.locale = "es"
                        return
                    case "English":
                        this.user.locale = "en"
                        return
                }
            }
        }
    },

    data() {
        return {
            languages: ["Castellano", "English"]
        }
    },

    props: ["user"]
}
</script>


<style lang="scss" scoped>
.input {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 100%;
    position: absolute;
    top:0; bottom: 0; left:0; right: 0;
    z-index: 18;
    cursor: pointer;
}
</style>