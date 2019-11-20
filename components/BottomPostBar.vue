<template lang="pug">
    v-layout(justify-space-around)
        v-flex(xs3)
            v-btn(text)
                .mr-1 {{card.commentsCount}}
                v-icon mdi-comment
        v-flex(xs5)
            karma(:card="card")
        v-flex(xs3)
            v-btn(text)
                .mr-1 {{card.shareCount}}
                v-icon mdi-share-variant
</template>

<script>
import Karma from "@/components/Karma"

export default {
    components: {
        Karma
    },

    props: ["card"]
}
</script>