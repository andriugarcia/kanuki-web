<template lang="pug">
    v-layout(justify-space-around)
        v-flex(xs3)
            v-btn(text)
                .mr-1 {{comments}}
                v-icon mdi-comment
        v-flex(xs5)
            karma(:karma="karma")
        v-flex(xs3)
            v-btn(text)
                .mr-1 {{share}}
                v-icon mdi-share-variant
</template>

<script>
import Karma from "@/components/Karma"

export default {
    components: {
        Karma
    },

    props: ["comments", "karma", "share"]
}
</script>