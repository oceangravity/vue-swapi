import Vue from 'vue'
import Vuex from 'vuex'
import Main from './modules/main'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    'main': Main
  },
  strict: true
})
