import colors from 'vuetify/es5/util/colors'

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

  env: {
    S3_BUCKET_NAME: "kanuki-assets",
    AWS_ACCESS_KEY_ID: "7JS47KGN2K4PZVRBJ6DP",
    AWS_SECRET_ACCESS_KEY: "3Rp7SkhcskR0RgqoF0eWYa1DyfRVBDjqX0rY/OvKCv0"
  },

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
    "~/plugins/masonry",
    {src: '~/plugins/chart', mode: 'client'}
  ],

  apollo: {
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    // (Optional) Default 'apollo' definition
    defaultOptions: {
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },

    clientConfigs: {
      default: '~/apollo/config.js'
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
