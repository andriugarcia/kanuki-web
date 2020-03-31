<template lang="pug">
    #MainColumn
        b(style="font-size: 1.3em;") Books más populares
        v-card
            v-list(color="transparent")
                v-list-item(v-for="(i) in 5", :key="i", @click="")
                    v-list-item-avatar
                        v-img(:src="require('@/assets/images/kanuki-pill-avatar-default.png')", :size="16")
                    v-list-item-content
                        v-layout(align-center)
                            .mr-2(style="font-size: 1.2em") {{i}}
                            v-list-item-title.font-weight-bold p/pill
                    v-list-item-action
                        v-icon(v-if="i <= 3", :color=" i == 1 ? 'kyellow darken-1' : i == 2 ? 'kblue darken-2' : 'kred darken-2'") mdi-star
            .ma-2.pb-2
                v-btn(block, outlined, color="kred") Ver Más
        div(style="position: sticky; top: 0")
        v-card.mt-2
            v-subheader ANUNCIO
            div(style="width: 100%; height: 450px; background-color: #ff6384")
        
        b(style="font-size: 1.3em;").mt-6 Mejores Books por Categoría 
        v-expansion-panels.mt-2
            v-expansion-panel
                v-expansion-panel-header Deportes
            v-expansion-panel
                v-expansion-panel-header Gaming
            v-expansion-panel
                v-expansion-panel-header Viajes
            v-expansion-panel
                v-expansion-panel-header Tecnología
            v-expansion-panel
                v-expansion-panel-header Finanzas y Empresa
</template>