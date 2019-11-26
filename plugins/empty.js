import Vue from "vue"

Vue.mixin({
    methods: {
      isEmpty(someObject){
        return Object.keys(someObject).length === 0
      }
    }
  })