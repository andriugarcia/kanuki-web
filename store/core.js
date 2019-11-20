export const state = () => ({
    isMounted: false
  })
  
  export const mutations = {
    setMounted (state) {
      state.isMounted = true
    }

  }