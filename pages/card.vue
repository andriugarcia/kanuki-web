<template lang="pug">
    #card
        #mobile(v-if="isMounted && !$vuetify.breakpoint.mdAndUp")
            v-layout.pa-3(align-center)
                v-btn(icon, @click="$router.go(-1)")
                    v-icon mdi-arrow-left
                v-chip.pr-0(:color="pill.name ? 'kred' : 'kblue'", small, dark, @click="toParent")
                    .font-weight-bold {{ pill.name ? `p/${pill.name}` : `u/${card.author.name}` | truncateChip}}
                    follow.ml-1(:name="pill.name || card.author.name", :isUser="!pill.name")
                v-spacer
                v-btn(text, @click="spreadDialog = true") Spread
            client-only
                v-layout(slot="placeholder", justify-center, align-center)
                    v-skeleton-loader(type="card", style="width: 100%")
                component.rounded(:is="dynamicTemplate", @save="save", :content="content", :user="userParam", :edit="edit", :card="cardParam", :key="rerender")
            v-card.pa-2(ref="card", :class="{'margintop': !expansion, 'fullscreen': expansion}", style="border-radius: 24px 24px 0 0")
                #touch.pb-3(ref="touch")
                    v-layout(align-center)
                        v-btn(icon, large, @click="previous")
                            v-icon mdi-arrow-left
                        .ml-2
                            .font-weight-bold {{card.title}}
                            .hover.rounded(@click.stop="$router.push({path: `/u/${card.author.name}`})") u/{{card.author.name | truncate}}
                        v-spacer
                        v-btn.mr-2(v-if="card.author.name == user.name", fab, dark, small, :color="edit ? 'black' : 'green'", @click="editAction")
                            v-icon(small) {{edit ? 'mdi-content-save' : 'mdi-pencil'}}
                        like-button(:name="card.name", :author="card.author.name")
                        v-btn(icon, large, @click="next")
                            v-icon mdi-arrow-right
                    bottom-post-bar(:card="card")
                #scroll(ref="scroll")
                    .my-4.ml-2(v-if="!edit") {{card.description}}
                    .mt-4(v-else)
                        .font-weight-bold Descripción
                        v-textarea.mt-4(v-model="card.description", placeholder="Descripción", solo, rounded)
                    card-pills(:card="card", :edit="edit")
                    comments(v-if="expansion", :card="card", :pill="pill.name ? pill.name : ''")
        #desktop(v-else)
            v-layout(align-start)
                v-flex(v-if="!analytics", xs8)
                    v-layout.mt-6(align-center)
                        v-btn(icon, @click="$router.go(-1)")
                            v-icon mdi-arrow-left
                        v-chip.pr-0(:color="pill.name ? 'kred' : 'kblue'", small, dark, @click="toParent")
                            .font-weight-bold {{ pill.name ? `p/${pill.name}` : `u/${card.author.name}` | truncate}}
                            follow.ml-1(:name="pill.name || card.author.name", :isUser="!pill.name")
                        v-spacer
                        v-btn(text, small, @click="spreadDialog = true") 
                            v-icon(small) mdi-source-fork
                            div Spread
                    client-only(:key="rerender")
                        v-layout(slot="placeholder", justify-center, align-center)
                            v-skeleton-loader(type="card", style="width: 100%")
                            //- v-progress-circular(:size="100", :width="8", color="#4F9CD1", indeterminate)
                        component.rounded.mt-5(:is="dynamicTemplate", @save="save", :content="content", :user="userParam", :edit="edit", :card="cardParam")
                v-flex(v-else, xs8)
                    card-analytics
                v-flex.ma-1.mx-2(xs4, style="padding-top: 72px")
                    v-card.pa-3(style="border-radius: 24px")
                        v-layout(align-center)
                            v-btn(icon, large, @click="previous")
                                v-icon mdi-arrow-left
                            .ml-2
                                .font-weight-bold {{card.title | truncate}}
                                .hover.rounded(@click.stop="$router.push({path: `/u/${card.author.name}`})") u/{{card.author.name | truncate}}
                            v-spacer
                            v-btn.mr-2(v-if="card.author.name == user.name", fab, dark, small, :color="edit ? 'black' : 'green'", @click="editAction")
                                v-icon(small) {{edit ? 'mdi-content-save' : 'mdi-pencil'}}
                            like-button(:name="card.name", :author="card.author.name")
                            v-btn.ml-2(icon, large, @click="next")
                                v-icon mdi-arrow-right
                        bottom-post-bar.mt-1(:card="card")
                    v-layout.pt-3(v-if="card.author.name == user.name", block, justify-center)
                        v-btn.ml-1.font-weight-bold(rounded, depressed, color="#00000010", @click="analytics = true")
                            v-icon.kblue--text mdi-poll
                            .ml-2.text-capitalize.kblue--text(style="letter-spacing: 0") Analíticas
                    .my-4.ml-2(v-if="!edit") {{card.description}}
                    .mt-4(v-else)
                        .font-weight-bold Descripción
                        v-textarea.mt-4(v-model="card.description", placeholder="Descripción", solo, rounded)
                    v-layout(justify-space-between, align-center)
                        .font-weight-bold Publicado en
                        v-btn(text, small, @click="spreadDialog = true") 
                            v-icon(small) mdi-source-fork
                            div Spread
                    card-pills(:card="card", :edit="edit")
                    v-btn.mt-4.font-weight-bold(v-if="edit", rounded, color="red", block, dark, @click="spreadDelete = true") Eliminar Post
                    comments(:card="card", :pill="pill.name ? pill.name : ''")
        #spread
            v-dialog(v-model="spreadDialog", v-if="$vuetify.breakpoint.mdAndUp", width="500")
                spread(:card="card")
            v-bottom-sheet(v-else, v-model="spreadDialog")
                spread(:card="card")

        #deletePost
            v-dialog(v-model="deleteDialog", v-if="$vuetify.breakpoint.mdAndUp", width="500", persistent, @back="deleteDialog = false")
                delete-card(:name="card.name")
            v-bottom-sheet(v-else, v-model="spreadDialog", persistent, @back="deleteDialog = false")
                delete-card(:name="card.name")
</template>

<script>
import LikeButton from "@/components/LikeButton"
import BottomPostBar from "@/components/BottomPostBar"
import gql from "graphql-tag"
import Follow from "@/components/Follow"
import truncate from "@/helpers/truncate"
import CardPills from "@/components/CardPills"

import externalComponent from '@/helpers/external-component';

export default {

    async asyncData({app, params, store}) {
        console.log("Getting Data")
        let client = app.apolloProvider.defaultClient
        let autenticated = store.state.auth.user.name ? true : false
        console.log("AUTH: ", autenticated)

        let query
        if (params.pill) {
            query = gql`query GetPublication($name: String!, $author: String!, $pill: String!) {
                getPublication(card: $name, cardAuthor: $author, pill: $pill) {
                    card {
                        name,
                        title,
                        description,
                        karma,
                        ${autenticated ? 'vote,' : ''}
                        type,
                        shareCount,
                        commentsCount,
                        publications {
                            pill {
                                name, avatar, banner, description, followersCount
                            }
                        },
                        comments {
                            id,
                            text,
                            karma,
                            ${autenticated ? 'vote,' : ''}
                            author {
                                name,
                                avatar
                            },
                            pill {
                                name
                            },
                            card {
                                name
                            },
                            subComments {
                                id,
                                text,
                                karma,
                                ${autenticated ? 'vote,' : ''}
                                author {
                                    name,
                                    avatar
                                },
                                pill {
                                    name
                                },
                                card {
                                    name
                                },
                                subComments {
                                    id,
                                    text,
                                    karma,
                                    ${autenticated ? 'vote,' : ''}
                                    author {
                                        name,
                                        avatar
                                    },
                                    pill {
                                        name
                                    },
                                    card {
                                        name
                                    },
                                    subComments {
                                        id,
                                        text,
                                        karma,
                                        author {
                                            name,
                                            avatar
                                        },
                                        pill {
                                            name
                                        },
                                        card {
                                            name
                                        }
                                    }
                                }
                            }
    
                        },
                        content,
                        author {
                            name, avatar
                        }
                    },

                    pill {
                        name
                    }
                }
            }`
        }

        else {
            query = gql`query GetCard($name: String!, $author: String!) {
                getCard(name: $name, author: $author) {
                    name,
                    title,
                    description,
                    karma,
                    ${autenticated ? 'vote,' : ''}
                    type,
                    shareCount,
                    commentsCount,
                    karma,
                    publications {
                        pill {
                            name, avatar, banner, description, followersCount
                        }
                    },
                    comments {
                        id,
                        text,
                        karma,
                        ${autenticated ? 'vote,' : ''}
                        author {
                            name,
                            avatar
                        },
                        pill {
                            name
                        },
                        card {
                            name
                        },
                        subComments {
                            id,
                            text,
                            karma,
                            ${autenticated ? 'vote,' : ''}
                            author {
                                name,
                                avatar
                            },
                            pill {
                                name
                            },
                            card {
                                name
                            },
                            subComments {
                                id,
                                text,
                                karma,
                                ${autenticated ? 'vote,' : ''}
                                author {
                                    name,
                                    avatar
                                },
                                pill {
                                    name
                                },
                                card {
                                    name
                                }
                            }

                        }

                    },
                    content,
                    author {
                        name, avatar
                    }
                }
            }`
        }

        let {data} = await client.query({
            query,
            variables: {
                name: params.card,
                author: params.author,
                pill: params.pill
            }
        })

        let card = typeof data.getPublication != 'undefined' ? data.getPublication.card : data.getCard
        let pill = typeof data.getPublication != 'undefined' ? data.getPublication.pill : {}

        console.log(card.comments)

        return {
            card,
            pill
        }
    },

    components: {
        LikeButton,
        BottomPostBar,
        Comments: () => import("@/components/Comments"),
        Spread: () => import("@/layouts/spread"),
        DeleteCard: () => import("@/components/DeleteCard"),
        CardAnalytics: () => import("@/components/CardAnalytics"),
        CardPills,
        Follow
    },

    computed: {
        content: {
            get() {
                return JSON.parse(this.card.content)
            },

            set(value) {
                this.card.content = JSON.stringify(value)
            }
        },

        user() {
            return this.$store.state.auth.user
        },

        dynamicTemplate() {
            console.log("Getting card type: ", this.card.type)
            return () => externalComponent(`https://kanuki-router.herokuapp.com/kanuki-${this.card.type}/kanuki-${this.card.type}.umd.min.js`)
        },

        isMounted() {
            return this.$store.state.core.isMounted
        },

        cardParam() {
            return {
                name: this.card.name,
                title: this.card.title,
                karma: this.card.karma,
                locale: this.card.locale,
                shareCount: this.card.shareCount,
                likesCount: this.card.likesCount,
                description: this.card.description
            }
        },

        userParam() {
            return {
                name: this.card.author.name,
                avatar: this.card.author.avatar,
                locale: this.card.author.locale,
                email: this.card.author.email
            }
        }
    },

    data() {
        return {
            expansion: false,
            hide: false,
            card: {},
            edit: false,
            rerender: 0,
            spreadDialog: false,
            deleteDialog: false,
            analytics: false
        }
    },

    filters: {
        truncate(value) {
            let str = value.toString()
            return truncate(str, 28)
        },
        truncateChip(value) {
            let str = value.toString()
            return truncate(str, 14)
        },
    },

    methods: {
        editAction() {
            if (this.edit) {
                this.save()

                this.edit = false
            }
            else {
                this.edit = true
            }
        },

        async save() {
            console.log("saving")
            await this.$apollo.mutate({
                mutation: gql`mutation EditCard($name: String!, $description: String, $content: String) {
                    editCard(name: $name, description: $description, content: $content) {
                        name
                    }
                }`,

                variables: {
                    name: this.card.name,
                    description: this.card.description,
                    content: JSON.stringify(this.content)
                }
            })
        },

        toParent() {
            const path = typeof this.pill.name != 'undefined' ? `/p/${this.pill.name}` : `/u/${this.card.author.name}`
            this.$router.push({path})
        },

        async next() {
            let query

            console.log()
            if (this.existPill()) {
                query = gql`query NextPublication($name: String!, $author: String!, $pill: String!) {
                    nextPublication(card: $name, cardAuthor: $author, pill: $pill) {
                        card {
                            name, title, description, karma, type, shareCount, commentsCount,
                            comments { id, text,
                                author { name },
                                pill { name },
                                card {  name }
                            },
                            content,
                            author { name }
                        },
                        pill { name }
                    }
                }`
            }
            else {
                console.log(this.card.name, this.card.author.name)
                query = gql`query NextCard($name: String!, $author: String!) {
                    nextCard(name: $name, author: $author) {
                        name, title, description, karma, type, shareCount, commentsCount,
                        comments { id, text,
                            author { name },
                            pill { name },
                            card {  name }
                        },
                        content,
                        author { name }
                    }
                }`

            }

            let {data} = await this.$apollo.query({
                query,
                variables: {
                    name: this.card.name,
                    author: this.card.author.name,
                    pill: this.pill ? this.pill.name : ""
                }
            })

            if (typeof data.nextPublication == "object" && data.nextPublication == null) {
                return this.$router.push({path: `/p/${this.pill.name}`})
            }
            
            if (typeof data.nextCard == "object" && data.nextCard == null) {
                return this.$router.push({path: `/u/${this.card.author.name}`})
            }

            let card = typeof data.nextPublication != 'undefined' ? data.nextPublication.card : data.nextCard
            let pill = typeof data.nextPublication != 'undefined' ? data.nextPublication.pill : {}
            this.card = card
            this.pill = pill

            this.rerender++

            history.replaceState(
                {},
                null,
                this.existPill() ? `/p/${pill.name}/${card.author.name}/${card.name}` : `/u/${card.author.name}/${card.name}`

            )

        },

        async previous() {
            let query

            if (this.existPill()) {
                query = gql`query PreviousPublication($name: String!, $author: String!, $pill: String!) {
                    previousPublication(card: $name, cardAuthor: $author, pill: $pill) {
                        card {
                            name, title, description, karma, type, shareCount, commentsCount,
                            comments { id, text,
                                author { name },
                                pill { name },
                                card {  name }
                            },
                            content,
                            author { name }
                        },
                        pill { name }
                    }
                }`
            }
            else {
                
                query = gql`query PreviousCard($name: String!, $author: String!) {
                    previousCard(name: $name, author: $author) {
                        name, title, description, karma, type, shareCount, commentsCount,
                        comments { id, text,
                            author { name },
                            pill { name },
                            card {  name }
                        },
                        content,
                        author { name }
                    }
                }`

            }

            let {data} = await this.$apollo.query({
                query,
                variables: {
                    name: this.card.name,
                    author: this.card.author.name,
                    pill: this.pill ? this.pill.name : ""
                }
            })

            if (typeof data.previousPublication == "object" && data.previousPublication == null) {
                return this.$router.push({path: `/p/${this.pill.name}`})
            }
            
            if (typeof data.previousCard == "object" && data.previousCard == null) {
                return this.$router.push({path: `/u/${this.card.author.name}`})
            }

            let card = typeof data.previousPublication != 'undefined' ? data.previousPublication.card : data.previousCard
            let pill = typeof data.previousPublication != 'undefined' ? data.previousPublication.pill : {}
            this.card = card
            this.pill = pill

            this.rerender--

            history.replaceState(
                {},
                null,
                this.existPill() ? `/p/${pill.name}/${card.author.name}/${card.name}` : `/u/${card.author.name}/${card.name}`

            )
        },

        existPill() {
            return typeof this.pill.name != 'undefined'
        },

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
        let heds = document.getElementsByTagName("head")
        let link = document.createElement("link")
        link.href = `https://kanuki-router.herokuapp.com/kanuki-${this.card.type}/kanuki-${this.card.type}.css`
        link.rel = "stylesheet"
        link.type = "text/css"

        heds[0].appendChild(link)

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