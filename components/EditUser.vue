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