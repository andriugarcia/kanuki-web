<template lang="pug">
  v-app
    #desktop(v-if="isMounted && $vuetify.breakpoint.mdAndUp")
      v-card.pa-2(style="position: fixed; top: 0; left: 0; border-radius: 0 0 24px 0")
        v-layout(align-center)
          v-btn(icon)
            v-avatar
              img(src="~/assets/images/KanukiLogo.png")
          v-btn.ml-2(fab, depressed, small, dark, color="kblue")
            v-icon mdi-plus
      v-card.pa-2(style="position: fixed; top: 0; right: 0; z-index: 20; border-radius: 0 0 0 24px")
        v-text-field(placeholder="Buscar", solo, flat, hide-details)
          v-avatar(color="indigo", slot="append", size="32")
      v-layout
        v-flex(xs3, style="padding-top: 64px")
          library
        v-flex(xs9)
          nuxt-child
    #mobile(v-else)
      nuxt-child.pa-1
      div(v-if="$route.name != 'Card' && $route.name != 'Publication'")
        v-toolbar.px-6(style="position: fixed; bottom: 0; left: 0; right: 0")
          v-btn(icon)
            v-avatar
              img(src="~/assets/images/KanukiLogo.png")
          v-spacer
          v-btn(icon, :color="($route.name == 'Search') ? 'kred' : ''", @click="$router.push({name: 'Search'})")
            v-icon mdi-magnify
          v-spacer
          v-btn(icon, :color="routing == 'library' ? 'kyellow' : ''", @click="routing = 'library'")
            v-icon mdi-folder
          v-spacer
          v-btn(icon)
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
  
export default {

  components: {
    Library,
    CreateSwitch: () => import("@/components/CreateSwitch")
  },

  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },

  data() {
    return {
      createDialog: false,
      isMounted: false,
      routing: ""
    }
  },

  methods: {
    async getUser() {
      let data = await this.$apollo.query({
        query: gql`query {
          getUser(name: "andres") {
            name,
            avatar,
            followers {
              name
            },
            following {
              name
            },
            cards {
              name
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
    this.isMounted = true

    let data = await this.$apollo.mutate({
      mutation: gql`mutation {
        login(name: "andres", password: "micontraseña")
      }`
    })

    console.log(data)

    await this.$apolloHelpers.onLogin(data.data.login)

    console.log("getting user")
    this.getUser()

    // this.$store.commit("auth/setUser", data.data.login)
  },

}
</script>