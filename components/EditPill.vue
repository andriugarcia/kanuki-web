<template lang="pug">
    #EditPill
        v-hover
            template(v-slot:default="{ hover }")
                v-img(:src="require('@/assets/images/pill-default-banner.png')", style="height: 100%; border-radius: 24px;")
                    v-fade-transition
                        v-overlay(v-if="hover", absolute, style="border-radius: 24px")
                            v-icon mdi-pencil
                    input.input(type="file")
        v-layout.ml-8(align-center, style="margin-top: -60px")
            v-hover
                template(v-slot:default="{ hover }")
                    v-avatar(:size="120")
                        v-img(:src="require('@/assets/images/kanuki-user-avatar-default.png')")
                        v-fade-transition
                            v-overlay(v-if="hover", absolute)
                                v-icon mdi-pencil
                        input.input(type="file")
            v-card.ml-3.pa-3(style="border-radius: 24px;")
                .font-weight-bold p/{{pill.name}}
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
                    v-img(:src="require('@/assets/images/kanuki-user-avatar-default.png')")
                v-list-item-title.font-weight-bold u/{{admin.name}}
                follow.my-2(name="andres", :isUser="true")
            v-list-item
                v-text-field(placeholder="Nuevo moderador")
                    v-chip.font-weight-bold(small, color="kblue", dark, slot="prepend-inner") u/
                    v-btn.font-weight-bold(small, rounded, dark, color="kblue", slot="append-outer", style="letter-spacing: 0") Añadir
        v-btn.mt-5(color="red lighten-4", large, depressed, block) 
            .red--text.font-weight-bold(style="letter-spacing: 0") Dejar este grupo
        v-layout.my-6(justify-space-around)
            v-flex(xs5, @click="emit('cancel')")
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

    data() {
        return {
            languages: ["Castellano", "English"]
        }
    },

    props: ["pill"]
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