export const state = () => ({
    user: {}
  })
  
  export const mutations = {
    setUser (state, data) {
      state.user = data
    },

    mergeUser (state, atr) {
      Object.assign(state.user, atr)
    }
  }