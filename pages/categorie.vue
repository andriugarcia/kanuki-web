<template lang="pug">
    v-layout(style="padding-top: 72px")
        v-flex(xs12, md8)
            .font-weight-black.ml-4(style="font-size: 5em;") {{$route.params.categorie}}
            popular-categorie(v-if="!$vuetify.breakpoint.mdAndUp")
        v-flex(xs12, md4, v-if="$vuetify.breakpoint.mdAndUp")
            popular-categorie
            main-column
            
</template>

<script>
import Follow from "@/components/Follow"
import PopularCategorie from "@/components/PopularCategorie"
export default {
    components: {
        Follow,
        PopularCategorie,
        MainColumn: () => import("@/components/MainColumn")
    }
}
</script>