import gql from "graphql-tag"

export const state = () => ({
    user: {},
    logged: false,
    subscribed: false
  })
  
  export const mutations = {
    setUser (state, data) {
      state.user = data
    },

    mergeUser (state, atr) {
      Object.assign(state.user, atr)
    },

    signed(state) {
      state.logged = true
    },

    logout(state) {
      state.logged = false
    },

    subscribe(state, data) {
      state.subscribed = data
    }
  }

  export const actions = {

    async login (context, {user, pass}) {
      let client = this.app.apolloProvider.defaultClient
      
      let {data} = await client.mutate({
        mutation: gql`mutation Login($user: String!, $pass: String!) {
          login(name: $user, password: $pass)
        }`,

        variables: {
          user, pass
        }

      })
    
      await this.app.$apolloHelpers.onLogin(data.login)
      context.dispatch("getUser", {user, pass})
      context.commit("signed")
    },
    
    async register(context, {user, email, pass}) {
      let client = this.app.apolloProvider.defaultClient
      
      let {data} = await client.mutate({
        mutation: gql`mutation Register($user: String!, $email: String!, $pass: String!) {
          register(name: $user, email: $email, password: $pass)
        }`,
        
        variables: {
          user, email, pass
        }
        
      })
      context.commit("signed")
    },
    
    async logout (context) {
      this.app.$apolloHelpers.onLogout()
      context.commit("setUser", {})
      context.dispatch("setCookie", {user: "", pass: ""})
      context.commit("logout")
    },

    async authenticate (context) {
      console.log("AUTH")
      let client = this.app.apolloProvider.defaultClient
      console.log("document", document)
      let cookie = await context.dispatch("getCookie")
      console.log(cookie)
      // let cookie = {name: "andres", pass: "micontraseña"}
      if (typeof cookie.name == 'undefined') return false
      
      let {data} = await client.mutate({
        mutation: gql`mutation Login($name: String!, $pass: String!) {
          login(name: $name, password: $pass)
        }`,
        variables: cookie
      })
    
      console.log("LOGIN")
      await this.app.$apolloHelpers.onLogin(data.login)
      console.log("SET USER")
      await context.dispatch("getUser", {user: cookie.name})

      return true
    },

    setCookie(context, {user, pass}) {
        var d = new Date();
        d.setTime(d.getTime() + (120*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = "user" + "=" + user + ";" + expires + ";path=/";
        document.cookie = "pass" + "=" + pass + ";" + expires + ";path=/";
    },

    async getCookie() {
      var ret = {}
      var nameUser = "user" + "=";
      var decodedCookieUser = decodeURIComponent(document.cookie);
      var caUser = decodedCookieUser.split(';');
      for(var i = 0; i <caUser.length; i++) {
        var c = caUser[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(nameUser) == 0) {
          ret.name = c.substring(nameUser.length, c.length);
        }
      }

      var namePass = "pass" + "=";
      var decodedCookiePass = decodeURIComponent(document.cookie);
      var caPass = decodedCookiePass.split(';');
      for(var i = 0; i <caPass.length; i++) {
        var c = caPass[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(namePass) == 0) {
          ret.pass = c.substring(namePass.length, c.length);
        }
      }

      return ret;
    },


    async getUser(context, {user, pass}) {
      let client = this.app.apolloProvider.defaultClient

      let {data} = await client.query({
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
            },
            likes {
              name
            },
            followingPills {
              name, avatar
            },
            adminInPills {
              name, avatar
            }
          }
        }`
      })
  
      context.commit("setUser", data.getUser)
      
    }
  }

  