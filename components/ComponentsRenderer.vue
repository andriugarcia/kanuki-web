<template lang="pug">
    #Components
        transition-group(name="list-complete", tag="div", :class="{'elevation-3': !edit && !isMiniature}")
            div(v-for="(el, i) in content", :key="el.id", :class="{'mb-2': edit, 'list-complete-item': !isMiniature}")
                v-sheet(@click="selected = i", color="white", :class="{'elevation-3': edit}")
                    v-layout.px-2(v-if="edit", justify-space-between, align-center, :style="i == 0 ? 'background-color: #FFC441' : ''")
                        v-flex(xs4)
                            i(style="font-size: .8em", :class="{'grey--text': i != 0}") {{ el.type }}
                        v-flex.d-flex.justify-center(xs4)
                            v-menu(offset-y, open-on-hover)
                                template(v-slot:activator="{on}")
                                    v-icon(v-on="on") mdi-dots-horizontal
                                v-card.pa-2
                                    v-btn(text, icon, :disabled="i == content.length - 1", @click="swapUp(i)")
                                        v-icon mdi-arrow-down-thick
                                    v-btn(text, icon, :disabled="i == 0", @click="swapDown(i)")
                                        v-icon mdi-arrow-up-thick
                        v-flex.d-flex.justify-end(xs4)
                            v-tooltip(v-if="i == 0", bottom)
                                template.d-flex(v-slot:activator="{ on }")
                                    i.mr-2( style="font-size: .8em") Miniatura
                                    v-icon(small) mdi-pin
                                span Aparecerá como miniatura
                            v-icon(small) mdi-format-title
                    component(:is="elements[i]", :content="el.content", :user="user", :edit="selected == i && edit", :card="{}", :key="0", :style="edit ? 'padding-bottom: 25px' : ''")
        
                v-layout(v-if="selected == i && edit",  style="margin-top: -28px", justify-center, align-center)
                    v-card(v-if="deleting", style="border-radius: 32px")
                        v-layout.pa-1(justify-center, align-center)
                            v-btn(fab, small, depressed, dark, color="kred", @click="deleting = false")
                                v-icon mdi-close
                            b.mx-2 ¿Quieres borrar está plantilla?
                            v-btn(fab, small, depressed, dark, color="green", @click="removeTemplate(selected)")
                                v-icon mdi-check
                    v-card(v-else-if="restarting", style="border-radius: 32px")
                        v-layout.pa-1(justify-center, align-center)
                            v-btn(fab, small, depressed, dark, color="kred", @click="restarting = false")
                                v-icon mdi-close
                            b.mx-2 ¿Quieres reiniciar está plantilla?
                            v-btn(fab, small, depressed, dark, color="green", @click="restartTemplate(selected)")
                                v-icon mdi-check
                    v-layout(v-else, align-center, justify-center)
                        v-btn.mr-2(fab, small, @click="deleting = true")
                            v-icon.gray--text mdi-close
                        v-btn(fab, color="kred", dark, @click="create = true")
                            v-icon mdi-plus
                        v-btn.ml-2(fab, small, @click="restarting = true")
                            v-icon.gray--text mdi-pin-outline

        v-dialog(v-if="$vuetify.breakpoint.mdAndUp", width="500", v-model="create")
            v-card.pa-2(style="border-radius: 16px")
                card-store(@create="addCard")
        v-bottom-sheet(v-else, v-model="create")
            v-card.pa-2(style="border-radius: 16px")
                card-store(@create="addCard")
</template>

<script>
import externalComponent from '@/helpers/external-component';
import importStyle from '@/helpers/import-style'


export default {
    
    components: {
        cardStore: () => import("@/components/CardStore"),
    },

    methods: {
        addCard(event) {
            this.content.splice(this.selected + 1, 0, {
                type: event,
                content: {},
                id: this.generateId()
            })

            this.elements.splice(this.selected + 1, 0, () => import(/* webpackMode: "eager" */ `@/templates/kanuki-${event}/web-template.esm.js`))

            this.create = false

            this.selected = this.selected + 1

        },

        generateId() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },

        removeTemplate(pos) {
            this.content.splice(pos, 1)
            this.components.splice(pos, 1)
            this.selected = -1
            this.deleting = false
        },

        restartTemplate(pos) {
            this.content[pos].content = {}
            this.restarting = false
        },

        swapDown(pos) {

            this.selected = -1
            let aux = this.content[pos]
            let auxComp = this.elements[pos]

            this.content[pos] = this.content[pos - 1]
            this.elements[pos] = this.elements[pos - 1]

            this.content[pos - 1] = aux
            this.elements[pos - 1] = auxComp
            this.selected = pos - 1

        },

        swapUp(pos) {

            this.selected = -1
            let aux = this.content[pos]
            let auxComp = this.elements[pos]

            this.content[pos] = this.content[pos + 1]
            this.elements[pos] = this.elements[pos + 1]

            this.content[pos + 1] = aux
            this.elements[pos + 1] = auxComp

            this.selected = pos + 1
        }
    },

    computed: {

        user() {
            return this.$store.state.auth.user
        },
    },

    props: {edit: Boolean, content: Object, isMiniature: Boolean},

    data() {
        return {
            selected: 0,
            create: false,
            deleting: false,
            restarting: false,
            elements: this.content.map(el => () => import(/* webpackMode: "eager" */ `@/templates/kanuki-${el.type}/web-template.esm.js`))
        }
    }
}
</script>

<style lang="scss" scoped>
div {
    transition:width 1s ease-in-out;
}

.list-complete-item {
  transition: all .5s;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>