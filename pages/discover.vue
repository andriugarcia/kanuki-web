<template lang="pug">
    #Discover
        v-layout(align-start, style="padding-top: 72px")
            v-flex(xs12, md8)
                h1.mb-4.ml-4(v-if="$vuetify.breakpoint.mdAndUp") Categorías
                v-layout.my-4(v-else, align-center)
                    v-btn(icon, @click="$emit('back')")
                        v-icon mdi-arrow-left
                    .overline.ml-2 Categorías
                v-layout.ml-2(wrap)
                    v-flex(xs6, md3, v-for="(categorie, i) in categories", :key="i")
                        v-card.mr-2.mb-2(color="kred", @click="$router.push({path: '/c/' + categorie.name})", hover, style="height: 200px;", :img="categorie.img")
                            p.white--text.font-weight-black.stroke(style="font-size: 1.6em; position: absolute; bottom: -6px; left: 10px; right: 12px") {{categorie.name}}
            v-flex(xs4, v-if="$vuetify.breakpoint.mdAndUp")
                main-column
</template>

<script>
export default {
    components: {
        MainColumn: () => import("@/components/MainColumn")
    },

    data() {
        return {
            categories: [
                {
                    name: "Deportes",
                    img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                },
                {
                    name: "Gaming",
                    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                },
                {
                    name: "Noticias",
                    img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                },
                {
                    name: "TV",
                    img: "https://images.unsplash.com/photo-1571415060716-baff5f717c37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1947&q=80"
                },
                {
                    name: "Memes",
                    img: ""
                },
                {
                    name: "Animales",
                    img: "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                },
                {
                    name: "Viajes",
                    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                },
                {
                    name: "Tecnología",
                    img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1907&q=80"
                },
                {
                    name: "Música",
                    img: "https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                },
                {
                    name: "Arte y Diseño",
                    img: "https://images.unsplash.com/photo-1526304760382-3591d3840148?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                },
                {
                    name: "Belleza y Estilo Personal",
                    img: "https://images.unsplash.com/photo-1498842812179-c81beecf902c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
                },
                {
                    name: "Literatura",
                    img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
                },
                {
                    name: "Inversión y Monedas",
                    img: "https://images.unsplash.com/photo-1549421263-6064833b071b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2718&q=80"
                },
                {
                    name: "Comida",
                    img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80"
                },
                {
                    name: "Finanzas y Empresa",
                    img: "https://images.unsplash.com/photo-1480944657103-7fed22359e1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80"
                },
                {
                    name: "Debate",
                    img: "https://images.unsplash.com/photo-1496902526517-c0f2cb8fdb6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                },
                {
                    name: "Salud y Fitness",
                    img: "https://images.unsplash.com/photo-1549890762-0a3f8933bc76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2270&q=80"
                },
                {
                    name: "Moda",
                    img: "https://images.unsplash.com/photo-1491956142110-8a4226a12077?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                },
                {
                    name: "Aprendizaje",
                    img: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80"
                },
                {
                    name: "Mindblowing",
                    img: "https://images.unsplash.com/photo-1534870439272-475575042b61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                },
                {
                    name: "Naturaleza",
                    img: "https://images.unsplash.com/photo-1550236520-7050f3582da0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
                },
                {
                    name: "Paternidad",
                    img: "https://images.unsplash.com/photo-1542948843-bf19f4f535cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
                },
                {
                    name: "Fotografía",
                    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
    .stroke {
        -webkit-text-stroke-width: 1px; 
        -webkit-text-stroke-color: black; 
    }
</style>