import Vue from 'vue'
import Vuex from 'vuex'
import * as appState from './modules/appState'
import * as lyric from './modules/lyric'
import * as playlist from './modules/playlist'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    appState,
    lyric,
    playlist
  }
})
