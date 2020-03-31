<template lang="pug">
  v-app(style="background-color: #f2f2f2")
    div(v-if="!embded")
      #desktop(v-if="isMounted && $vuetify.breakpoint.mdAndUp")
        v-card.pa-2(style="position: fixed; top: 0; left: 0; border-radius: 0 0 24px 0; z-index: 20")
          v-layout(align-center)
            v-avatar.hover(v-ripple, @click="$router.push({path: '/'})")
              img(src="~/assets/images/KanukiLogo.png")
            v-dialog(v-model="createDialog", width="500")
              template(v-slot:activator="{ on }")
                v-btn(v-on="on", fab, depressed, small, dark, color="kblue")
                  v-icon mdi-plus
              create-switch
        v-card.pa-2(style="position: fixed; top: 0; right: 0; width: 360px; z-index: 20; border-radius: 0 0 0 24px; z-index: 20")
          v-layout(align-center)
            v-autocomplete.mr-2(:placeholder="$t('search.header')", solo, flat, hide-details, v-model="searchText", append-icon="", append-outer-icon="mdi-magnify", @click:append="$router.push({path: '/s/' + searchText})", color="kblue", @keydown.enter="$router.push({path: '/s/' + searchText})")
            v-menu(v-if="logged", offset-y, open-on-hover)
              template(v-slot:activator="{ on }")
                v-avatar.mt-2(v-on="on", size="32")
                  v-img(:src="user.avatar")
              v-card
                notifications
        v-layout(align-start)
          v-flex(xs3, style="padding-top: 64px; position: sticky; top: 0; left: 0; right: 0")
            library
            v-layout(wrap, justify-center)
              v-btn.font-weight-black.text-capitalize(x-small, text, style="letter-spacing: 0") {{$t('about.what')}}
              v-btn.font-weight-black.text-capitalize(x-small, text, style="letter-spacing: 0") {{$t('about.developers')}}
              v-btn.font-weight-black.text-capitalize(x-small, text, style="letter-spacing: 0") {{$t('about.careers')}}
              v-btn.font-weight-black.text-capitalize(x-small, text, style="letter-spacing: 0") {{$t('about.conditions')}}
            v-divider.my-4.mx-12
            v-layout(justify-center)
              v-btn(icon, color="black") 
                v-icon mdi-instagram
              v-btn(icon, color="black") 
                v-icon mdi-twitter
              v-btn(icon, color="black") 
                v-icon mdi-youtube
              v-btn(icon, color="black") 
                v-icon mdi-linkedin
          v-flex(xs9)
            nuxt-child
      #mobile(v-else)
        nuxt-child.pa-1(v-if="routing == ''")
        library.pa-1(v-else-if="routing == 'library'", @back="routing = ''")
        notifications.pa-1(v-else="routing == 'notifications'", @back="routing = ''")
        div(v-if="$route.name != 'Card' && $route.name != 'Publication'")
          v-toolbar.px-6(style="position: fixed; bottom: 0; left: 0; right: 0")
            v-btn(icon, @click="toHome")
              div
                v-avatar(:size="32")
                  v-img(:src="require('~/assets/images/KanukiLogo.png')")
                b.text-capitalize(style="display: block; font-size: .7em") Inicio
            v-spacer
            v-btn(icon, :color="($route.name == 'Search') ? 'kred' : ''", @click="toSearch")
              div
                v-icon mdi-magnify
                b.text-capitalize(style="display: block; font-size: .7em", :class="{'.kred--text' : $route.name == 'Search'}") Encuentra
            v-spacer
            v-btn.font-weight-bold.text-capitalize(v-if="!logged", depressed, rounded, color="kyellow", @click="$store.commit('core/setOpenAccountPopup', true)", style="letter-spacing: 0") 
              v-icon.mr-2 mdi-account-circle
              div {{$t('signin')}}
            v-btn(v-if="logged",icon, :color="routing == 'library' ? 'kyellow' : ''", @click="routeTo('library')")
              div
                v-icon mdi-folder
                b.text-capitalize(style="display: block; font-size: .7em", :class="{'.kyellow--text' : $route.name == 'library'}") Biblioteca
            v-spacer(v-if="logged")
            v-btn(v-if="logged", icon, @click="routeTo('notifications')")
              div
                v-badge(overlap, color="kblue", :content="testNotifications", :value="testNotifications")
                  v-avatar(size="32")
                    img(:src="user.avatar")
                b.text-capitalize(style="display: block; font-size: .7em") Notificaciones
          v-layout(v-if="logged", justify-center, style="position: fixed; bottom: 32px; left: 0; right: 0;")
            v-bottom-sheet(v-model="createDialog")
              template(v-slot:activator="{ on }")
                v-btn(fab, v-on="on", color="kblue", dark)
                  v-icon mdi-plus
              create-switch
      #accountPopup
          v-dialog(v-if="$vuetify.breakpoint.mdAndUp", width="800", v-model="openAccountPopup")
              create-account-popup(@back="$store.commit('core/setOpenAccountPopup', false)")
          v-bottom-sheet(v-else, v-model="openAccountPopup")
              create-account-popup(@back="$store.commit('core/setOpenAccountPopup', false)")
    div(v-else)
      embded
</template>

<script>
import Library from '@/layouts/library'
import gql from 'graphql-tag'
import Notifications from "@/layouts/notifications"
  
export default {

  components: {
    Library,
    CreateSwitch: () => import("@/components/CreateSwitch"),
    CreateAccountPopup: () => import("@/components/createAccountPopup"),
    Notifications,
    Embded: () => import("@/components/Embded")
  },

  created() {
    if (this.$route.query.embded == 'true' && this.$route.params.card) {
      this.embded = true
    }
  },

  computed: {
    user() {
      return this.$store.state.auth.user
    },

    logged() {
      return this.$store.state.auth.logged
    },

    openAccountPopup: {
      get() {
        return this.$store.state.core.openAccountPopup
      },
      set(value) {
        this.$store.commit('core/setOpenAccountPopup', value)
      }
    },
    
    isMounted() {
      return this.$store.state.core.isMounted
    },

    autenticated() {
      return false
      return !this.isEmpty(this.$store.state.auth.user)
    }
  },

  data() {
    return {
      createDialog: false,
      testNotifications: 1,
      routing: "",
      searchText: "",
      embded: false
    }
  },

  methods: {

    routeTo(r) {
      if (this.routing == r) {
        this.routing = ''
      }
      else {
        this.routing = r
      }
    },
    toHome() {
      this.routing = ""
      this.$router.push({name: "Home"})
    },

    toSearch() {
      this.routing = ""
      this.$router.push({name: "Discover"})
    }
  },

  async mounted() {
    this.$store.commit("core/setMounted")
    console.log("OneSignal", this.$OneSignal)

    const self = this
    self.$OneSignal.push(() => {
      self.$OneSignal.isPushNotificationsEnabled((isEnabled) => {
        if (isEnabled) {
          console.log('Push notifications are enabled!')
          self.$store.commit("auth/subscribe", true)
        } else {
          console.log('Push notifications are not enabled yet.')
          self.$store.commit("auth/subscribe", false)

          self.$OneSignal.push(function() {
          self.$OneSignal.on('subscriptionChange', function (isSubscribed) {
            console.log("The user's subscription state is now:",isSubscribed);
            self.$store.commit("auth/subscribe", isSubscribed)
              self.$OneSignal.push(function() {
                self.$OneSignal.getUserId(function(userId) {
                  console.log("OneSignal User ID:", userId);
                });
              });
            });
          });
        }
      })
    })
  },

}
</script>