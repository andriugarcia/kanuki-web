<template lang="pug">
    v-layout.hide-scroll(justify-start, style="overflow-x: scroll")
        v-flex(v-for="(publication, i) in publications", :key="i", xs8, md5)
            v-card.ma-1.pointer(style="position: relative; height: 100px;", v-ripple, @click="$router.push({path: `/p/${publication.pill.name}`})")
                v-img(:src="require('@/assets/images/pill-default-banner.png')", style="width: 100%; height: 24px; object-fit: cover")
                    v-layout.mr-1(justify-end)
                        .ma-1.font-weight-bold(style="font-size: .7em") {{publication.pill.followersCount}}
                        v-icon(size="12") mdi-account
                v-avatar.ml-2(style="position: absolute; top: 12px; left: 0", size="24")
                    v-img(:src="require('@/assets/images/kanuki-pill-avatar-default.png')")
                .pa-2.pt-4
                    .font-weight-bold(style="font-size: .8em") p/{{publication.pill.name | truncate}}
                    div(style="font-size: .7em") {{publication.pill.description | truncateDescription}}
</template>

<script>

import truncate from "@/helpers/truncate"

export default {
    filters: {
        truncate(value) {
            let str = value.toString()
            return truncate(str, 14)
        },

        truncateDescription(value) {
            let str = value.toString()
            return truncate(str, 40)
        }
    },
    props: ["publications"]
}
</script>

<style lang="scss" scoped>
    .hide-scroll::-webkit-scrollbar {
        display: none;
    }
</style>