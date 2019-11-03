<template lang="pug">
    #Comment(style="position: relative")
        v-card.pa-6.mt-12(color="grey lighten-3", style="border-radius: 24px", flat)
            div Esto es un comentario
        v-card(style="position: absolute; top: -24px; right: 48px; left: 12px; border-radius: 24px")
            v-layout(align-center)
                v-avatar(color="indigo", size="40")
                .ml-1
                    .font-weight-bold(style="font-size: .8em") p/pill
                    div(style="font-size: .8em") u/user
                v-spacer
                v-btn(text)
                    div REPLY
                    v-icon mdi-reply
        v-layout(style="position: absolute; bottom: -16px; left: 0; right: 0", justify-center)
            karma

</template>

<script>
import Karma from "@/components/Karma"

export default {
    components: {
        Karma
    }
}
</script>