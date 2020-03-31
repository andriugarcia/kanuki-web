<template lang="pug">
    #FixedCards
        b.ml-2(style="font-size: 1.2em;") {{$t('fixedPages')}}
        v-layout.hide-scroll(justify-start, align-center, style="overflow-x: scroll")
            v-flex.mt-4(v-for="i in 10", :key="i", style="position: relative")
                v-card.mr-2.pointer(style="position: relative; height: 160px; width: 120px;", :color="isPill ? 'kred' : 'kblue'", v-ripple, hover, @click="")
                    v-layout.pa-1.pt-2(align-center)
                        v-avatar(size="24")
                            v-img(src="")
                        .ml-1.font-weight-bold.white--text(style="font-size: .7em") u/user
                    .pa-2
                        .font-weight-bold.uns.white--text(style="font-size: 1.2em") Titulo del Blog
                    i.white--text(style="position: absolute; bottom: 4px; left: 8px; font-size: .7em;") 512 {{$t('karma')}}
                v-btn.elevation-8(x-small, fab, @click="", style="position: absolute; top: -12px; right: 12px;")
                    v-icon(small) mdi-pin-off  
</template>

<script>
export default {
    props: {"isPill": Boolean}
}
</script>