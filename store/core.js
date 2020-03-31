export const state = () => ({
    isMounted: false,
    openAccountPopup: false
  })
  
  export const mutations = {
    setMounted (state) {
      state.isMounted = true
    },

    setOpenAccountPopup(state, data) {
      state.openAccountPopup = data
    }

  }