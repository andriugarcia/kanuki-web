<template lang="pug">
  v-app
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
      v-card.pa-2(style="position: fixed; top: 0; right: 0; z-index: 20; border-radius: 0 0 0 24px; z-index: 20")
        v-layout
          v-text-field(placeholder="Buscar", solo, flat, hide-details, v-model="searchText", append-icon="mdi-magnify", @click.append="$router.push({path: '/s/' + searchText})", color="kblue", @keydown.enter="$router.push({path: '/s/' + searchText})")
          v-menu(offset-y, open-on-hover)
            template(v-slot:activator="{ on }")
              v-avatar.mt-2(v-on="on", size="32")
                v-img(:src="user.avatar")
            v-card
              notifications
      v-layout
        v-flex(xs3, style="padding-top: 64px")
          library
        v-flex(xs9)
          nuxt-child
    #mobile(v-else)
      nuxt-child.pa-1(v-if="routing == ''")
      library.pa-1(v-else-if="routing == 'library'", @back="routing = ''")
      notifications.pa-1(v-else="routing == 'notifications'", @back="routing = ''")
      div(v-if="$route.name != 'Card' && $route.name != 'Publication'")
        v-toolbar.px-6(style="position: fixed; bottom: 0; left: 0; right: 0")
          v-btn(icon, @click="toHome")
            v-avatar
              img(src="~/assets/images/KanukiLogo.png")
          v-spacer
          v-btn(icon, :color="($route.name == 'Search') ? 'kred' : ''", @click="toSearch")
            v-icon mdi-magnify
          v-spacer
          v-btn(icon, :color="routing == 'library' ? 'kyellow' : ''", @click="routing = 'library'")
            v-icon mdi-folder
          v-spacer
          v-btn(icon, @click="routing = 'notifications'")
            v-avatar(size="32")
              img(:src="user.avatar")
        v-layout(justify-center, style="position: fixed; bottom: 32px; left: 0; right: 0;")
          v-bottom-sheet(v-model="createDialog")
            template(v-slot:activator="{ on }")
              v-btn(fab, v-on="on", color="kblue", dark)
                v-icon mdi-plus
            create-switch

</template>

<script>
import Library from '@/layouts/library'
import gql from 'graphql-tag'
import Notifications from "@/layouts/notifications"
  
export default {

  components: {
    Library,
    CreateSwitch: () => import("@/components/CreateSwitch"),
    Notifications
  },

  computed: {
    user() {
      return this.$store.state.auth.user
    },
    
    isMounted() {
      return this.$store.state.core.isMounted
    }
  },

  data() {
    return {
      createDialog: false,
      routing: "",
      searchText: ""
    }
  },

  methods: {

    toHome() {
      this.routing = ""
      this.$router.push({name: "Home"})
    },

    toSearch() {
      this.routing = ""
      this.$router.push({name: "Discover"})
    },

    async getUser() {
      let data = await this.$apollo.query({
        query: gql`query {
          getUser(name: "andres") {
            name,
            avatar,
            followers {
              name, avatar
            },
            following {
              name, avatar
            },
            cards {
              name,
              title,
              description,
              karma,
              author {
                name
              }
            },
            publications {
              card {
                name
              }
            }
            likes {
              name
            }
            followingPills {
              name
            }
          }
        }`
      })

      this.$store.commit("auth/setUser", data.data.getUser)
    }
  },

  async mounted() {
    this.$store.commit("core/setMounted")

    let {data} = await this.$apollo.mutate({
      mutation: gql`mutation {
        login(name: "andres", password: "micontraseña")
      }`
    })

    console.log(data.login)

    await this.$apolloHelpers.onLogin(data.login)
    const tok = await this.$apolloHelpers.getToken()

    // console.log(tok)
    // console.log("getting user")
    await this.getUser()

  },

}
</script>