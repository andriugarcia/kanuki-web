<template lang="pug">
    v-layout.hide-scroll(justify-start, align-center, style="overflow-x: scroll")
        v-flex.mt-4(v-for="(publication, i) in card.publications", :key="i", xs5, style="position: relative")
            v-card.ma-1.pointer(style="position: relative; height: 100px;", v-ripple, hover, @click="$router.push({path: `/p/${publication.pill.name}`})")
                v-img(:src="require('@/assets/images/pill-default-banner.png')", style="width: 100%; height: 24px; object-fit: cover")
                    v-layout.mr-1(justify-end)
                        .ma-1.font-weight-bold.uns(style="font-size: .7em") {{publication.pill.followersCount}}
                        v-icon(size="12") mdi-account
                v-avatar.ml-2(style="position: absolute; top: 12px; left: 0", size="24")
                    v-img(:src="require('@/assets/images/kanuki-pill-avatar-default.png')")
                .pa-2.pt-4
                    .font-weight-bold.uns(style="font-size: .8em") p/{{publication.pill.name | truncate}}
                    .uns(style="font-size: .7em") {{publication.pill.description | truncateDescription}}
            v-btn.elevation-8(v-if="edit", x-small, fab, @click="removePublication(i)", style="position: absolute; top: -12px; right: 12px;")
                v-icon(small) mdi-close
        v-btn.ml-4.mr-10.text-capitalize(rounded, outlined, color="kblue", dark, depressed, style="letter-spacing: 0", @click="openSpread") {{$t('publish.header')}}
        
</template>

<script>

import truncate from "@/helpers/truncate"
import gql from "graphql-tag"

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

    methods: {
        async removePublication(index) {
            this.$store.dispatch("publication/remove", {card: this.card, index})

            this.card.publications.splice(index, 1)
        },

        openSpread() {
            if(this.$store.state.auth.logged) {
                this.$emit('spread')
            }
            else {
                this.$store.commit('core/setOpenAccountPopup', true)
            }
        }
    },

    props: {
        card: Object,
        edit: Boolean
    }
}
</script>