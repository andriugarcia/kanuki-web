<template lang="pug">
    #Pill
        #mobile(v-if="!$vuetify.breakpoint.mdAndUp")
            .pa-6
                h1 Buscar.
                v-text-field.my-3(solo, hide-details, placeholder="Buscar")
                v-layout.mt-3(flex)
                    v-btn(text, color="kred")
                        .font-weight-bold.text-capitalize Todo
                    v-btn(text)
                        v-icon mdi-pill
                        .font-weight-bold.text-capitalize Pills
                    v-btn(text)
                        v-icon mdi-cards
                        .font-weight-bold.text-capitalize Cards
                    v-btn(text)
                        v-icon mdi-account
                        .font-weight-bold.text-capitalize Users
            post(v-for="i in 10", :key="i")
        #desktop(v-else)
            v-layout(style="padding-top: 72px")
                v-flex(xs8)
                    h1 Resultados de search
                    masonry(:cols="{default: 2, 960: 1}")
                        post(v-for="i in 10", :key="i")
                v-flex(xs4)
                    v-layout.mt-3(flex)
                        v-btn(text, color="kred")
                            .font-weight-bold.text-capitalize Todo
                        v-btn(text)
                            v-icon mdi-pill
                            .font-weight-bold.text-capitalize Pills
                        v-btn(text)
                            v-icon mdi-cards
                            .font-weight-bold.text-capitalize Cards
                        v-btn(text)
                            v-icon mdi-account
                            .font-weight-bold.text-capitalize Users
                    

</template>

<script>
import Follow from "@/components/Follow"
import Post from "@/components/Post"

export default {
    components: {
        Follow,
        Post
    }
}
</script>