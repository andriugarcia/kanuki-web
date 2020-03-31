<template lang="pug">
    v-card(color="kred", style="border-radius: 24px 24px 0 0")
        .pa-4(v-if="share == ''")
            .font-weight-black.ml-6.mt-4(style="font-size: 2.5em") {{$t('share.header')}}
            i.ml-4.font-weight-light "Frase guay para incitar el compartir"
            v-layout.mt-4(justify-center)
                v-card.pa-5.mr-1.text-center(flat, color="transparent", @click="shareTo('copy')")
                    v-icon(large) mdi-qrcode
                    div Código QR
                v-card.pa-5.mr-1.text-center(flat, color="transparent", @click="share = 'embded'")
                    v-icon(large) mdi-code-tags
                    div Embeber
                v-card.pa-5.mr-1.text-center(flat, color="transparent", @click="shareTo('copy')")
                    v-icon(large) mdi-telegram
                    div Telegram
                v-card.pa-5.text-center(flat, color="transparent", @click="shareTo('copy')")
                    v-icon(large) mdi-discord
                    div Discord
            v-text-field.px-2.mt-4(solo-inverted, flat, disabled, :value="link") 
                v-icon(slot="append") mdi-content-copy
            v-list(color="kred")
                v-list-item(@click="shareTo('whatsapp')")
                    v-list-item-avatar
                        v-icon mdi-whatsapp
                    v-list-item-title Whatsapp
                v-list-item(@click="shareTo('twitter')")
                    v-list-item-avatar
                        v-icon mdi-twitter
                    v-list-item-title Twitter
                v-list-item(@click="shareTo('facebook')")
                    v-list-item-avatar
                        v-icon mdi-facebook
                    v-list-item-title Facebook
                v-list-item(v-if="isAndroidOrIos", @click="")
                    v-list-item-avatar
                        v-icon mdi-dots-vertical
                    v-list-item-title Más Opciones
        .pa-4(v-else)
            .font-weight-black.ml-6.mt-4(style="font-size: 2.5em") Embded
            .ml-6 Inserta esta página donde lo necesites
            v-text-field.px-2.mt-4(solo-inverted, flat, disabled, :value="link + '?embded=true'") 
                v-icon(slot="append") mdi-content-copy
            v-btn.text-capitalize(block, text, @click="share = ''") Compartir de otra forma
        
</template>

<script>
import gql from "graphql-tag"
export default {
    computed: {
        link() {
            return window.location.href
        },
        isAndroidOrIos() {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;

            if (/android/i.test(userAgent)) {
                return true;
            }

            // iOS detection from: http://stackoverflow.com/a/9039885/177710
            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                return true;
            }

            return false
        }
    },

    data() {
        return {
            copied: false,
            share: ''
        }
    },

    methods: {
        toNativeShare() {
            navigator.share({
                url: window.location.href,
                title: "Kanuki",
                text: "Sharing this"
            })
        },

        increment() {
            this.$apollo.mutate({
                mutation: gql`mutation IncrementShareCount($card: String!, $cardAuthor: String!) {
                    incrementShareCount(card: $card, cardAuthor: $cardAuthor) {
                        name
                    }
                }`,
                variables: {
                    card: this.card.name,
                    cardAuthor: this.card.author.name
                }
            })
            this.card.shareCount++
        },

        shareTo(network) {
            this.increment()

            switch (network) {
                case 'copy':
                    this.copyToClipboard()
                    return
            }
        },

        
        copyToClipboard(str) {
            const self = this
            navigator.clipboard.writeText(window.location.href)
            .then(() => {
                self.copied = true
                setTimeout(() => {
                    self.copied = false
                }, 5000)
            })
        }

    },

    props: ["card"]
}
</script>
