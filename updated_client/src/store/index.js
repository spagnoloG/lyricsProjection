import Vue from 'vue'
import Vuex from 'vuex'
import * as appState from './modules/appState'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    appState
  }
})
