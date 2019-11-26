<template lang="pug">
    .mt-12
        v-layout.py-4(justify-space-between)
            .overline Analiticas de card
            v-card.pa-2.ml-2
                div 12 de Nov - 30 Ago
        v-layout(align-start)
            v-flex.pr-2(xs3)
                v-card.pa-2
                    v-subheader Duración media
                    .font-weight-bold(style="font-size: 2.4em") 03:30
            v-flex.pr-2(xs3)
                v-card.pa-2
                    v-subheader Tasa de entrada
                    .font-weight-bold(style="font-size: 2.4em") 80%
            v-flex(xs6)
                v-card.pa-2
                    v-subheader Por donde entra
                    .px-4
                        v-layout.mt-2
                            v-flex(xs2)
                                .font-weight-bold(style="font-size: .8em") p/pill
                            v-flex(xs10)
                                v-progress-linear.ml-2(:value="25", color="kred", height="25", rounded)
                                    template(v-slot="{ value }")
                                        strong 25%
                        v-layout.mt-2
                            v-flex(xs2)
                                .font-weight-bold(style="font-size: .8em") p/pill
                            v-flex(xs10)
                                v-progress-linear.ml-2(:value="60", color="kred", height="25", rounded)
                                    template(v-slot="{ value }")
                                        strong 60%
                        v-layout.mt-2
                            v-flex(xs2)
                                .font-weight-bold(style="font-size: .8em") u/user
                            v-flex(xs10)
                                v-progress-linear.ml-2(:value="40", color="kblue", height="25", rounded)
                                    template(v-slot="{ value }")
                                        strong 40%
                        v-layout.mt-2
                            v-flex(xs2)
                                .font-weight-bold(style="font-size: .8em") Timeline
                            v-flex(xs10)
                                v-progress-linear.ml-2(:value="15", color="kyellow", height="25", rounded)
                                    template(v-slot="{ value }")
                                        strong 15%
                        v-layout.mt-2
                            v-flex(xs2)
                                .font-weight-bold(style="font-size: .8em") Search
                            v-flex(xs10)
                                v-progress-linear.ml-2(:value="30", color="kyellow", height="25", rounded)
                                    template(v-slot="{ value }")
                                        strong 30%
        v-card.pa-1.mt-2
            .ma-2.font-weight-bold(style="font-size: 1.8em") 1200 Visitas
            v-btn-toggle(dense)
                v-btn Visitas
                v-btn Karma
                v-btn Comentarios
                v-btn Compartido
            linechart.mt-4(:chartData="data")
        v-card.pa-1.mt-2
            v-subheader Tasa de rebote
            .ml-4.font-weight-bold(style="font-size: 2.4em") 40%
            linechart.mt-4(:chartData="data")
</template>

<script>
import Linechart from "@/components/LineChart"
export default {
    components: {
        Linechart
    },

    data() {
        return {
            data: {
                datasets: [
                    {
                        label: "Visitas",
                        backgroundColor: "#ED526120",
                        data: [
                        {
                            x: new Date(1064524368000), y: 10
                        }, 
                        {
                            x: new Date(1164524368000), y: 30
                        }, 
                        {
                            x: new Date(1274524368000), y: 10
                        }, 
                        {
                            x: new Date(1304524368000), y: 40
                        }, 
                        {
                            x: new Date(1428024368000), y: 100
                        }, 
                        {
                            x: new Date(1448024368000), y: 40
                        }, 
                        {
                            x: new Date(1518024368100), y: 60
                        }, 
                        {
                            x: new Date(1584524368000), y: 12
                        },
                        {
                            x: new Date(1584584382100), y: 20
                        },
                        {
                            x: new Date(1604524368000), y: 11
                        }
                        ],
                        fill: true,
                        borderColor: '#ED5261'
                    },
                ]
            },
        }
    }
}
</script>