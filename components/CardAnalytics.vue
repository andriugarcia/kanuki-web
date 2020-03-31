<template lang="pug">
    #CardAnalytics.mt-12
        .overline Analiticas de card
        v-card.mt-2
            v-layout(justify-space-between, align-start)
                v-flex(xs6)
                    v-subheader Fechas
                    v-menu(offset-y, :close-on-content-click="false", width="600")
                        template(v-slot:activator="{on}")
                            v-layout.pointer(v-on="on")
                                b.ml-4(style="font-size: 1.2em") {{dateRangeText}}
                                v-icon mdi-menu-down
                        v-date-picker(v-model="dates", range, color="kblue", width="360")
                v-flex.pr-2(xs3)
                    v-subheader.pl-0 Duración media
                    .font-weight-bold(style="font-size: 1.2em") 03:30:00
                v-flex.pr-2(xs3)
                    v-subheader.pl-0 Tasa de entrada
                    .font-weight-bold(style="font-size: 1.2em") 80%
            v-divider.mt-4
            .pa-2
                v-subheader Por donde entra
                .px-4
                    v-layout.mt-2
                        v-flex(xs2)
                            .font-weight-bold(style="font-size: .8em") p/pill
                        v-flex(xs10)
                            v-progress-linear.ml-2(:value="25", color="kred", height="25", rounded)
                                template(v-slot="{ value }")
                                    strong 12K visitas
                    v-layout.mt-2
                        v-flex(xs2)
                            .font-weight-bold(style="font-size: .8em") p/pill
                        v-flex(xs10)
                            v-progress-linear.ml-2(:value="60", color="kred", height="25", rounded)
                                template(v-slot="{ value }")
                                    strong 12K visitas
                    v-layout.mt-2
                        v-flex(xs2)
                            .font-weight-bold(style="font-size: .8em") u/user
                        v-flex(xs10)
                            v-progress-linear.ml-2(:value="40", color="kblue", height="25", rounded)
                                template(v-slot="{ value }")
                                    strong 12K visitas
                    v-layout.mt-2
                        v-flex(xs2)
                            .font-weight-bold(style="font-size: .8em") Timeline
                        v-flex(xs10)
                            v-progress-linear.ml-2(:value="15", color="kyellow", height="25", rounded)
                                template(v-slot="{ value }")
                                    strong 12K visitas
                    v-layout.mt-2
                        v-flex(xs2)
                            .font-weight-bold(style="font-size: .8em") Search
                        v-flex(xs10)
                            v-progress-linear.ml-2(:value="30", color="kyellow", height="25", rounded)
                                template(v-slot="{ value }")
                                    strong 12K visitas
        v-card.pa-1.mt-2
            v-layout(style="border-radius: 24px 24px 0 0")
                v-hover(v-slot:default="{hover}")
                    v-sheet.pointer.selectable.pa-6(flat, @click="selected = 'visits'", :color="selected == 'visits' ? 'kblue' : hover ? 'grey lighten-2' : 'white'", :dark="selected == 'visits'", style="border-top: 2px solid blue")
                        .font-weight-bold.ml-2(style="font-size: 1.3em") 1200
                        .font-weight-bold.ml-2(style="font-size: 1.3em") Visitas
                        v-chip(small, color="transparent")
                            b 32,4%
                            v-icon(small, :color="selected == 'visits' ? 'white' : 'green'") mdi-arrow-up-bold
                v-hover(v-slot:default="{hover}")
                    v-sheet.pointer.selectable.pa-6(flat, @click="selected = 'karma'", :color="selected == 'karma' ? 'kblue' : hover ? 'grey lighten-2' : 'white'", :dark="selected == 'karma'", style="border-top: 2px solid blue")
                        .font-weight-bold.ml-2(style="font-size: 1.3em") 1200
                        .font-weight-bold.ml-2(style="font-size: 1.3em") Karma
                        v-chip(small, color="transparent")
                            b 32,4%
                            v-icon(small, :color="selected == 'karma' ? 'white' : 'green'") mdi-arrow-up-bold
                v-hover(v-slot:default="{hover}")
                    v-sheet.pointer.selectable.pa-6(flat, @click="selected = 'comments'", :color="selected == 'comments' ? 'kblue' : hover ? 'grey lighten-2' : 'white'", :dark="selected == 'comments'", style="border-top: 2px solid blue")
                        .font-weight-bold.ml-2(style="font-size: 1.3em") 1200
                        .font-weight-bold.ml-2(style="font-size: 1.3em") Comentarios
                        v-chip(small, color="transparent")
                            b 32,4%
                            v-icon(small, :color="selected == 'comments' ? 'white' : 'green'") mdi-arrow-up-bold
                v-hover(v-slot:default="{hover}")
                    v-sheet.pointer.selectable.pa-6(flat, @click="selected = 'bounce'", :color="selected == 'bounce' ? 'kblue' : hover ? 'grey lighten-2' : 'white'", :dark="selected == 'bounce'", style="border-top: 2px solid blue")
                        .font-weight-bold.ml-2(style="font-size: 1.3em") 1200
                        .font-weight-bold.ml-2(style="font-size: 1.3em") Rebote
                        v-chip(small, color="transparent")
                            b 32,4%
                            v-icon(small, :color="selected == 'bounce' ? 'white' : 'green'") mdi-arrow-up-bold
            linechart.mt-4(:chartData="data")
</template>

<script>
import Linechart from "@/components/LineChart"
export default {
    components: {
        Linechart
    },

    computed: {
        dateRangeText () {
            return this.dates.join(' ~ ')
        },
    },

    data() {
        return {
            dates: ['2019-09-10', '2019-09-20'],
            selected: "visits",
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
