import colors from 'vuetify/es5/util/colors'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import schema from './helpers/fragmentTypes.json'
const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: schema
  })

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    "~/assets/main.scss"
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "~/plugins/masonry"
  ],

  apollo: {
    tokenName: 'yourApolloTokenName', // optional, default: apollo-token
    cookieAttributes: {
      /**
        * Define when the cookie will be removed. Value can be a Number
        * which will be interpreted as days from time of creation or a
        * Date instance. If omitted, the cookie becomes a session cookie.
        */
      expires: 7, // optional, default: 7 (days)

      /**
        * Define the path where the cookie is available. Defaults to '/'
        */
      path: '/', // optional
      /**
        * Define the domain where the cookie is available. Defaults to
        * the domain of the page where the cookie was created.
        */
      domain: 'example.com', // optional

      /**
        * A Boolean indicating if the cookie transmission requires a
        * secure protocol (https). Defaults to false.
        */
      secure: false,
    },
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    authenticationType: 'Basic', // optional, default: 'Bearer'
    // (Optional) Default 'apollo' definition
    defaultOptions: {
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },

    clientConfigs: {
      default: {
        httpEndpoint: 'http://kanuki-gql.herokuapp.com/',
        httpLinkOptions: {
          credentials: 'same-origin'
        },
        tokenName: 'apollo-token', // optional
        persisting: false, // Optional
        websocketsOnly: false, // Optional
        // cache: new InMemoryCache({ fragmentMatcher })
      },
    }
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
    ['@nuxtjs/router', { /* module options */ }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/apollo'
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          kblue: "#4F9CD1",
          kyellow: "#FFC441",
          kred: "#ED5261"
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
