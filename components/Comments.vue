<template lang="pug">
    #Comments
        .font-weight-bold.mt-5 10 Comentarios
        v-card.mt-5(v-if="$vuetify.breakpoint.mdAndUp", style="border-radius: 24px")
            v-textarea.pb-3(solo, flat, auto-grow, hide-details, rows="1", placeholder="Escribe tu comentario...")
                v-btn(slot="append", fab, dark, small, color="kblue")
                    v-icon mdi-send
        comment(v-for="i in 10", :key="i")
        v-textarea(v-if="!$vuetify.breakpoint.mdAndUp", solo, flat, auto-grow, hide-details, rows="1", placeholder="Escribe tu comentario...", style="position: fixed; bottom: 0; left: 0; right: 0")
            v-btn(slot="append", fab, dark, small, color="kblue")
                v-icon mdi-send
</template>

<script>
import Comment from "@/components/Comment"

export default {
    components: {
        Comment
    }
}
</script>