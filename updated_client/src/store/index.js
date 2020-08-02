import Vue from 'vue'
import Vuex from 'vuex'
import * as appState from './modules/appState'
import * as psalm from './modules/psalm'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    appState,
    psalm
  }
})
