<template lang="pug">
    #EditPill
        v-hover
            template(v-slot:default="{ hover }")
                v-img(:src="pill.banner", style="height: 100%; border-radius: 24px;")
                    v-fade-transition
                        v-overlay(v-if="hover", absolute, style="border-radius: 24px")
                            v-layout(column, align-center)
                                v-icon mdi-pencil
                                div 1920x1080
                    image-input(:id="pill.name", type="banner", @change-banner="changeBanner")
        v-layout.ml-8(align-center, style="margin-top: -60px")
            v-hover
                template(v-slot:default="{ hover }")
                    v-avatar(:size="120")
                        v-img(:src="pill.avatar")
                        v-fade-transition
                            v-overlay(v-if="hover", absolute)
                                v-layout(column, align-center)
                                    v-icon mdi-pencil
                                    div 500x500
                        image-input(:id="pill.name", type="avatar", @change-avatar="changeAvatar")
            v-card.ml-3.pa-3(style="border-radius: 24px;")
                .font-weight-bold.uns p/{{pill.name}}
        v-layout.mt-6(align-center)
            .font-weight-bold Idioma de la comunidad: 
            v-select.font-weight-bold(color="#00000015", v-model="lang", :items="languages", style="width: 100%")
        .mt-6.font-weight-bold Descripción
        v-textarea.mt-2(v-model="pill.description", solo, rounded, auto-grow)
        .mt-3.font-weight-bold Pueden publicar
        v-btn-toggle(color="kred", v-model="permission")
            v-btn.text-capitalize.font-weight-bold 
                v-icon.mr-2 mdi-earth
                div(style="letter-spacing: 0") Todo el mundo
            v-btn.text-capitalize.font-weight-bold 
                v-icon.mr-2 mdi-account-multiple-check
                div(style="letter-spacing: 0") Solo los moderadores
        .mt-3.font-weight-bold Moderadores
        v-list.mt-2.elevation-2
            v-list-item(v-for="(admin, i) in pill.admins", :key="i")
                v-list-item-avatar
                    v-img(:src="admin.avatar")
                v-list-item-title.font-weight-bold u/{{admin.name}}
                follow.my-2(name="andres", :isUser="true")
            v-list-item
                v-text-field(placeholder="Nuevo moderador", v-model="textModerator")
                    v-chip.font-weight-bold(small, color="kblue", dark, slot="prepend-inner") u/
                    v-btn.font-weight-bold(small, rounded, dark, color="kblue", @click="addModerator", slot="append-outer", style="letter-spacing: 0") Añadir
            .px-4
                v-btn(color="red lighten-4", large, depressed, block) 
                    .red--text.font-weight-bold(style="letter-spacing: 0") Dejar este grupo
        v-layout.my-6(justify-space-around)
            v-flex(xs5, @click="emit('cancel')")
                v-btn.font-weight-bold(large, rounded, dark, block, color="red") Cancelar
            v-flex(xs5, @click="$emit('save')")
                v-btn.font-weight-bold(large, rounded, dark, block, color="black") Guardar


</template>

<script>

import Follow from "@/components/Follow"
import ImageInput from "@/components/ImageInput"

export default {
    components: {
        Follow,
        ImageInput
    },

    computed: {
        permission: {
            get() {
                if (this.pill.writePermission == 'public') {
                    return 0
                }
                return 1
            },

            set(value) {
                if (value == 0) {
                    this.pill.writePermission = 'public'
                }
                else {
                    this.pill.writePermission = 'onlyAdmin'
                }
            }
        },

        lang: {
            get() {
                switch (this.pill.locale) {
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
                        this.pill.locale = "es"
                        return
                    case "English":
                        this.pill.locale = "en"
                        return
                }
            }
        }
    },

    methods: {
        changeAvatar(link) {
            this.pill.avatar = link
        },

        changeBanner(link) {
            this.pill.banner = link
            console.log("Link: ", link)
            console.log("banner", this.pill.banner)
        },

        addModerator() {

        }
    },

    data() {
        return {
            languages: ["Castellano", "English"],
            textModerator: ""
        }
    },

    props: ["pill"]
}
</script>