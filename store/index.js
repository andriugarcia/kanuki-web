import gql from "graphql-tag"

export const actions = {
    // async nuxtServerInit({ commit }, { req }) {
    //     let client = this.app.apolloProvider.defaultClient
    //     console.log(await this.app.$apolloHelpers.getToken())
    //     try {
    //         console.log("GETTING USER")
    //         let {data} = await client.query({
    //           query: gql`query {
    //           getMe {
    //             name,
    //             email,
    //             avatar,
    //             karma,
    //             bio,
    //             locale,
    //             followersCount,
    //             followers {
    //               name, avatar
    //             },
    //             following {
    //                 name, avatar
    //             },
    //             cards {
    //                 name,
    //                 title,
    //                 karma,
    //                 vote,
    //                 type,
    //                 shareCount,
    //                 commentsCount,
    //                 content,
    //                 author {
    //                     name,
    //                     avatar
    //                 },
    //                 createdAt
    //             },
    //             publications {
    //               pill {
    //                 name
    //               },
    //               card {
    //                 name,
    //                 title,
    //                 karma,
    //                 type,
    //                 shareCount,
    //                 commentsCount,
    //                 content,
    //                 author {
    //                     name
    //                 }
    //               },
    //               createdAt
    //             }
    //             likes {
    //               name
    //             }
    //             followingPills {
    //               name, avatar
    //             }
    //             adminInPills {
    //               name, avatar
    //             }
    //           }
    //         }`
    //         })
      
    //         console.log(data.getMe)
    //         commit("auth/setUser", data.getMe)
    //       }
      
    //       catch(err) {
    //         console.log("El usuario no ha iniciado sesión previamente o el token ha caducado " + err)
    //       }
    // }
  }