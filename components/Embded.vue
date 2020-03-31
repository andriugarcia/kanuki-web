<template lang="pug">
    #card(v-if="!isEmpty(card)")
        v-layout.mt-6(align-center)
            v-chip.pr-0(:color="pill.name ? 'kred' : 'kblue'", small, dark, @click="toParent")
                .font-weight-bold {{ pill.name ? `p/${pill.name}` : `u/${card.author.name}` | truncate}}
                follow.ml-1(:name="pill.name || card.author.name", :isUser="!pill.name")
            v-spacer
            v-btn(text) 
                .text-capitalize View on&nbsp
                div Kanuki
        client-only(:key="rerender")
            components-renderer(:edit="edit", :content="card.content")
        recommended(:user="card.author.name", :pill="pill")
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

    // head() {
    //     return {
    //         title: `${this.card.name} - ${this.pill.name}`,
    //         description: this.card.description
    //     }
    // },

    async beforeMount() {
        let generateId = function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        // TEST COMPONENT DYNAMIC
        // let component = await axios.get("http://localhost:8200/kanuki-cover/kanuki-cover.umd.min.js")

        // console.log("Getting Data")
        let client = this.$apollo
        // console.log("AUTH: ", autenticated)

        let query
        if (this.$route.params.pill) {
            query = gql`query GetPublication($name: String!, $author: String!, $pill: String!) {
                getPublication(card: $name, cardAuthor: $author, pill: $pill) {
                    card {
                        name,
                        title,
                        description,
                        karma,
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
                name: this.$route.params.card,
                author: this.$route.params.author,
                pill: this.$route.params.pill
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
            // {
            //     id: generateId(),
            //     type: "link-preview",
            //     content: {}
            // },
            // {
            //     id: generateId(),
            //     type: "instagram-feed",
            //     content: {}
            // },
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
            // {
            //     id: this.generateId(),
            //     type: "poll",
            //     content: {}
            // }
        ]

        console.log(card)
        this.card = card
        this.pill = pill

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
            card: {},
            pill: {},
            rerender: 0,
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

        existPill() {
            return typeof this.pill.name != 'undefined'
        },

        goToClothing(id) {
            this.$router.push({path: `/armario/${id}`})
        },                                            


    },
}
</script>