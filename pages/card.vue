<template lang="pug">
    #card
        #mobile(v-if="!$vuetify.breakpoint.mdAndUp")
            v-layout.pa-3(align-center)
                v-btn(icon)
                    v-icon mdi-arrow-left
                v-chip(color="kblue", small, dark)
                    .font-weight-bold u/{{card.author.name}}
                v-spacer
                v-btn(text) Spread
            content(:content="card.content")
            v-card.pa-2(ref="card", :class="{'margintop': !expansion, 'fullscreen': expansion}", style="border-radius: 24px 24px 0 0")
                #touch.pb-3(ref="touch")
                    v-layout(align-center)
                        v-btn(icon, large)
                            v-icon mdi-arrow-left
                        .ml-2
                            .font-weight-bold card
                            div u/{{card.author.name}}
                        v-spacer
                        like-button
                        v-btn(icon, large)
                            v-icon mdi-arrow-right
                    bottom-post-bar(:comments="card.commentsCount", :karma="card.karma", :share="card.shareCount")
                #scroll(ref="scroll")
                    .pa-3 {{card.description}}
                    comments(v-if="expansion")
        #desktop(v-else)
            v-layout
                v-flex(xs8)
                    v-layout.pa-3(align-center)
                        v-btn(icon)
                            v-icon mdi-arrow-left
                        v-chip(color="kblue", small, dark)
                            .font-weight-bold u/{{card.author.name}}
                        v-spacer
                        v-btn(text) Spread
                    content(:content="card.content")
                v-flex.ma-1(xs4, style="padding-top: 72px")
                    v-card.pa-3(style="border-radius: 24px")
                        v-layout(align-center)
                            v-btn(icon, large)
                                v-icon mdi-arrow-left
                            .ml-2
                                .font-weight-bold card
                                div u/{{card.author.name}}
                            v-spacer
                            like-button
                            v-btn.ml-2(icon, large)
                                v-icon mdi-arrow-right
                        bottom-post-bar(:comments="card.commentsCount", :karma="card.karma", :share="card.shareCount")
                    comments
</template>

<script>
import LikeButton from "@/components/LikeButton"
import BottomPostBar from "@/components/BottomPostBar"
import gql from "graphql-tag"

export default {

    async asyncData({app, params}) {
        let client = app.apolloProvider.defaultClient

        let data = await client.query({
            query: gql`query GetCard($name: String!, $author: String!) {
                getCard(name: $name, author: $author) {
                    name,
                    title,
                    karma,
                    type,
                    shareCount,
                    commentsCount,
                    comments {
                        id,
                        text,
                        author {
                            name
                        },
                        pill {
                            name
                        },
                        card {
                            name
                        }

                    },
                    content,
                    author {
                        name
                    }
                }
            }`,

            variables: {
                name: params.card,
                author: params.author,
            }
        })

        return {
            card: data.data.getCard
        }
    },

    components: {
        LikeButton,
        BottomPostBar,
        Comments: () => import("@/components/Comments"),
        Content: () => import("kanuki-article")
    },

    data() {
        return {
            expansion: false,
            hide: false,
            card: {}
        }
    },

    methods: {
        expand(dir) {
            this.expansion = dir == 1
        },

        getTouches(evt) {
            return evt.touches ||             // browser API
                evt.originalEvent.touches; // jQuery
        },                                                     

        handleTouchStart(evt) {
            const firstTouch = this.getTouches(evt)[0];                                      
            this.xDown = firstTouch.clientX;                                      
            this.yDown = firstTouch.clientY;                                      
        },  

        goToClothing(id) {
            this.$router.push({path: `/armario/${id}`})
        },                                            

        handleTouchMove(evt) {
            evt.preventDefault()
            if ( ! this.xDown || ! this.yDown ) {
                return;
            }

            var xUp = evt.touches[0].clientX;                                    
            var yUp = evt.touches[0].clientY;

            var xDiff = this.xDown - xUp;
            var yDiff = this.yDown - yUp;

            if ( Math.abs( xDiff ) <= Math.abs( yDiff ) ) {/*most significant*/
                if ( yDiff > 0 ) {
                    this.expand(1)
                } else { 
                    /* down swipe */
                    this.expand(-1)
                }                                                                 
                     
            }
            /* reset values */
            this.xDown = null;
            this.yDown = null;                                             
        },

        handleScrollStart(evt) {
            const firstTouch = this.getTouches(evt)[0];                                      
            this.xDown = firstTouch.clientX;                                      
            this.yDown = firstTouch.clientY;                                      
        },                                              

        handleScrollMove(evt) {
            if ( ! this.xDown || ! this.yDown ) {
                return;
            }

            var xUp = evt.touches[0].clientX;                                    
            var yUp = evt.touches[0].clientY;

            var xDiff = this.xDown - xUp;
            var yDiff = this.yDown - yUp;

            if ( Math.abs( xDiff ) <= Math.abs( yDiff ) ) {/*most significant*/
                const scroll = this.$refs.scroll
                if ( yDiff <= 0 ) {
                    if (scroll.scrollTop == 0) {
                        evt.preventDefault()
                        this.expand(-1)
                    }
                }                                                                
                     
            }
            /* reset values */
            this.xDown = null;
            this.yDown = null;                                             
        },

        handleScroll() {
                                    
            const card = this.$refs.card

            if (this.mdAndUp) {
                if (window.scrollY + window.innerHeight > card.offsetHeight) {
                    this.disableFixed = true
                }

                else {
                    this.disableFixed = false
                }
            }

        },

    },

    mounted() {
        window.scrollTo(0, 0)
        window.addEventListener('scroll', this.handleScroll);
        const touch = this.$refs.touch
        touch.addEventListener('touchstart', this.handleTouchStart, false);        
        touch.addEventListener('touchmove', this.handleTouchMove, false);
        const scroll = this.$refs.scroll
        scroll.addEventListener('touchstart', this.handleScrollStart, false);        
        scroll.addEventListener('touchmove', this.handleScrollMove, false);
    }
}
</script>

<style lang="scss" scoped>
    .margintop {
        transition: .25s ease-in-out;
        z-index: 20;
        position: fixed;
        left: 0;
        right: 0;
        animation-duration: 2s;
        animation-delay: 5s;
        top: calc(100vh - 116px);
        /* animation-iteration-count: infinite; */
        /* margin-top: calc(100vh - 150px) */
    }

    .fullscreen {
        transition: .25s ease-in-out;
        z-index: 20;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        // top: 0;
    }

    #scroll {
        height: 86vh;
        overflow-y: scroll;
    }
</style>