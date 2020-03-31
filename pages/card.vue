<template lang="pug">
    #card
        #mobile(v-if="!$vuetify.breakpoint.mdAndUp")
            v-layout.pa-3(align-center)
                v-btn(icon, @click="$router.go(-1)")
                    v-icon mdi-arrow-left
                v-chip.pr-0(:color="pill.name ? 'kred' : 'kblue'", small, dark, @click="toParent")
                    .font-weight-bold {{ pill.name ? `p/${pill.name}` : `u/${card.author.name}` | truncateChip}}
                    follow.ml-1(:name="pill.name || card.author.name", :isUser="!pill.name")
                v-spacer
                v-btn(v-if="!logged", text, @click="$store.commit('core/setOpenAccountPopup', true)") {{$t('register')}}
                v-btn(v-else, text, @click="openSpread") 
                    v-icon.mr-1(small) mdi-antenna
                    div {{$t('publish.header')}}
            div(ref="components")
                client-only
                    components-renderer(:edit="edit", :content="card.content")
                recommended(:user="card.author.name", :pill="pill")
            v-card.pa-2(ref="card", :ripple="false", :class="{'margintop': !expansion, 'fullscreen': expansion, 'hided': disableFixed}", style="border-radius: 24px 24px 0 0")
                #touch.pb-3(ref="touch", @click="expansion = !expansion")
                    v-layout(align-center)
                        v-btn(icon, large, @click.stop="previous")
                            v-icon mdi-arrow-left
                        .ml-2
                            .font-weight-bold {{card.title}}
                            .hover.rounded(@click.stop="$router.push({path: `/u/${card.author.name}`})") u/{{card.author.name | truncate}}
                        v-spacer
                        v-btn.mr-2(v-if="card.author.name == user.name", fab, dark, small, :color="edit ? 'black' : 'green'", @click.stop="editAction")
                            v-icon(small) {{edit ? 'mdi-content-save' : 'mdi-pencil'}}
                        like-button(:name="card.name", :author="card.author.name")
                        v-btn(icon, large, @click.stop="next")
                            v-icon mdi-arrow-right
                    bottom-post-bar.mt-2(:card="card", @comments="openCommentsMobile")
                #scroll(ref="scroll")
                    .my-4.ml-2(v-if="!edit") {{card.description}}
                    .mt-4(v-else)
                        .font-weight-bold {{$t('description')}}
                        v-textarea.mt-4(v-model="card.description", placeholder="Descripción", solo, rounded)
                    v-layout(justify-space-between, align-center)
                        .ml-4.font-weight-bold {{$t('page.published')}}
                        v-btn(v-if="!logged", text, @click="$store.commit('core/setOpenAccountPopup', true)") {{$t('register')}}
                        v-btn(v-else, text, small, @click="spreadDialog = true") 
                            v-icon.mr-1(small) mdi-antenna
                            div {{$t('publish.header')}}
                    card-pills(:card="card", :edit="edit", @spread="spreadDialog = true")
                    comments#comments(v-if="expansion", :card="card", :pill="pill.name ? pill.name : ''")
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
                        v-btn(v-if="!logged", text, @click="$store.commit('core/setOpenAccountPopup', true)") {{$t('register')}}
                        v-btn(v-else, text, small, @click="openSpread") 
                            v-icon.mr-1(small) mdi-antenna
                            div {{$t('publish.header')}}
                    client-only(:key="rerender")
                        components-renderer.ma-2(:edit="edit", :content="card.content")
                    recommended(:user="card.author.name", :pill="pill")
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
                        .font-weight-bold {{$t('description')}}
                        v-textarea.mt-4(v-model="card.description", placeholder="Descripción", solo, rounded)
                    v-layout(justify-space-between, align-center)
                        .font-weight-bold {{$t('page.published')}}
                        v-btn(v-if="!logged", text, @click="$store.commit('core/setOpenAccountPopup', true)") {{$t('register')}}
                        v-btn(v-else, text, small, @click="spreadDialog = true") 
                            v-icon.mr-1(small) mdi-antenna
                            div {{$t('publish.header')}}
                    card-pills(:card="card", :edit="edit", @spread="spreadDialog = true")
                    v-btn.mt-4.font-weight-bold(v-if="edit", rounded, color="red", block, dark, @click="deleteDialog = true") {{$t('page.delete')}}
                    comments#comments(:card="card", :pill="pill.name ? pill.name : ''")
        #spread
            v-dialog(v-model="spreadDialog", v-if="$vuetify.breakpoint.mdAndUp", width="500")
                spread(:card="card", @back="spreadDialog = false")
            v-bottom-sheet(v-else, v-model="spreadDialog")
                spread(:card="card", @back="spreadDialog = false")

        #deletePost
            v-dialog(v-model="deleteDialog", v-if="$vuetify.breakpoint.mdAndUp", width="500", persistent, @back="deleteDialog = false")
                delete-card(:name="card.name", @back="deleteDialog = false")
            v-bottom-sheet(v-else, v-model="deleteDialog", persistent, @back="deleteDialog = false")
                delete-card(:name="card.name", @back="deleteDialog = false")
</template>

<script>
import LikeButton from "@/components/LikeButton"
import BottomPostBar from "@/components/BottomPostBar"
import gql from "graphql-tag"
import Follow from "@/components/Follow"
import truncate from "@/helpers/truncate"
import CardPills from "@/components/CardPills"
import ComponentsRenderer from "@/components/ComponentsRenderer"
import Recommended from "@/components/Recommended"

import externalComponent from '@/helpers/external-component';
import axios from "axios"

export default {

    head() {
        return {
            title: `${this.card.name} - ${this.pill.name}`,
            description: this.card.description
        }
    },

    async asyncData({app, params, store}) {

        let generateId = function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        // TEST COMPONENT DYNAMIC
        // let component = await axios.get("http://localhost:8200/kanuki-cover/kanuki-cover.umd.min.js")

        // console.log("Getting Data")
        let client = app.apolloProvider.defaultClient
        let autenticated = store.state.auth.user.name ? true : false
        // console.log("AUTH: ", autenticated)

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

        // console.log(card.comments)

        card.content = [
            {
                id: generateId(),
                type: "cover",
                content: {}
            },
            {
                id: generateId(),
                type: "youtube",
                content: {}
            },
            {
                id: generateId(),
                type: "article",
                content: {html: "<p>Funciona</p>"}
            },
            {
                id: generateId(),
                type: "link-preview",
                content: {}
            },
            {
                id: generateId(),
                type: "instagram-feed",
                content: {}
            },
            {
                id: generateId(),
                type: "image",
                content: {}
            },
            {
                id: generateId(),
                type: "gif",
                content: {}
            },
            {
                id: generateId(),
                type: "author",
                content: {}
            },
            {
                id: generateId(),
                type: "poll",
                content: {}
            }
        ]

        return {
            card,
            pill,
            autenticated,
        }
    },

    components: {
        LikeButton,
        BottomPostBar,
        Comments: () => import("@/components/Comments"),
        Spread: () => import("@/layouts/spread"),
        DeleteCard: () => import("@/components/DeleteCard"),
        CardAnalytics: () => import("@/components/CardAnalytics"),
        ComponentsRenderer,
        CardPills,
        Follow,
        Recommended
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

        logged() {
            return this.$store.state.auth.logged
        },

        openAccountPopup() {
            return this.$store.state.core.openAccountPopup
        },

        user() {
            return this.$store.state.auth.user
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
            disableFixed: false,
            spreadDialog: false,
            deleteDialog: false,
            autenticated: false,
            analytics: false,
            lastScrollTop: 0,
            recommended: []

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
                this.expansion = false
                this.edit = true
            }
        },

        openSpread() {
            if (!this.$store.state.auth.logged) {
                this.openAccountPopup = true
                return
            }
            this.spreadDialog = true
        },

        openCommentsMobile() {
            this.expansion = true
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
            window.scrollTo(0,0)
            this.expansion = false
            let query

            console.log()
            if (this.existPill()) {
                query = gql`query NextPublication($name: String!, $author: String!, $pill: String!) {
                    nextPublication(card: $name, cardAuthor: $author, pill: $pill) {
                        card {
                            name,
                            title,
                            description,
                            karma,
                            ${this.autenticated ? 'vote,' : ''}
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
                                ${this.autenticated ? 'vote,' : ''}
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
                                    ${this.autenticated ? 'vote,' : ''}
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
                                        ${this.autenticated ? 'vote,' : ''}
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
                console.log(this.card.name, this.card.author.name)
                query = gql`query NextCard($name: String!, $author: String!) {
                    nextCard(name: $name, author: $author) {
                        name,
                        title,
                        description,
                        karma,
                        ${this.autenticated ? 'vote,' : ''}
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
                            ${this.autenticated ? 'vote,' : ''}
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
                                ${this.autenticated ? 'vote,' : ''}
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
                                    ${this.autenticated ? 'vote,' : ''}
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
            window.scrollTo(0,0)
            this.expansion = false
            let query

            if (this.existPill()) {
                query = gql`query PreviousPublication($name: String!, $author: String!, $pill: String!) {
                    previousPublication(card: $name, cardAuthor: $author, pill: $pill) {
                        card {
                            name,
                            title,
                            description,
                            karma,
                            ${this.autenticated ? 'vote,' : ''}
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
                                ${this.autenticated ? 'vote,' : ''}
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
                                    ${this.autenticated ? 'vote,' : ''}
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
                                        ${this.autenticated ? 'vote,' : ''}
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
                
                query = gql`query PreviousCard($name: String!, $author: String!) {
                    previousCard(name: $name, author: $author) {
                        name,
                        title,
                        description,
                        karma,
                        ${this.autenticated ? 'vote,' : ''}
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
                            ${this.autenticated ? 'vote,' : ''}
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
                                ${this.autenticated ? 'vote,' : ''}
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
                                    ${this.autenticated ? 'vote,' : ''}
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
        
        handleClick(evt) {
            this.disableFixed = window.scrollY != 0 // True if is not at the top
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
            // evt.preventDefault()
            const firstTouch = this.getTouches(evt)[0];                                      
            this.xDown = firstTouch.clientX;                                      
            this.yDown = firstTouch.clientY;                                      
        },                                              

        handleScrollMove(evt) {
            evt.preventDefault()

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
                        this.expand(-1)
                    }
                }                                                                
                     
            }
            /* reset values */
            this.xDown = null;
            this.yDown = null;                                             
        },

        handleScroll(evt) {
            evt.preventDefault()

            var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
            if (st > this.lastScrollTop){
                // downscroll code
                this.disableFixed = true
            } else {
                this.disableFixed = false
                // upscroll code
            }
            this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        },

    },

    async mounted() {        
        if (process.client) {
        window.scrollY = 0
        console.log(window.scrollY)
        window.addEventListener('scroll', this.handleScroll);
        this.$refs.components.addEventListener('click', this.handleClick);

        this.$refs.touch.addEventListener('touchstart', this.handleTouchStart, false);        
        this.$refs.touch.addEventListener('touchmove', this.handleTouchMove, false);
        
        this.$refs.scroll.addEventListener('touchstart', this.handleScrollStart, false);        
        this.$refs.scroll.addEventListener('touchmove', this.handleScrollMove, false);
        }
    },

    beforeDestroy() {
        const scroll = this.$refs.scroll
        const touch = this.$refs.touch
        window.removeEventListener('scroll', this.handleScroll);
        touch.removeEventListener('touchstart', this.handleTouchStart, false);        
        touch.removeEventListener('touchmove', this.handleTouchMove, false);
        scroll.removeEventListener('touchstart', this.handleScrollStart, false);        
        scroll.removeEventListener('touchmove', this.handleScrollMove, false);
        
    },
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
        bottom: calc(-100vh + 120px);
        /* animation-iteration-count: infinite; */
        /* margin-top: calc(100vh - 150px) */
    }

    .hided {
        bottom: -110vh;
    }

    .fullscreen {
        transition: .25s ease-in-out;
        z-index: 20;
        position: fixed;
        bottom: -60px;
        left: 0;
        right: 0;
        // top: 0;
    }

    #scroll {
        height: 86vh;
        overflow-y: scroll;
    }
</style>