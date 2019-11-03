<template lang="pug">
    v-card.pa-1(color="kyellow")
        v-layout(justify-space-around, align-center)
            v-btn(small, icon)
                v-icon mdi-minus
            .font-weight-bold {{karma}}
            v-btn(small, icon)
                v-icon mdi-plus
</template>

<script>
export default {
    props: ["karma"]
}
</script>