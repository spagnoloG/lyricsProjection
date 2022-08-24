export const namespaced = true

export const state = {
  currentLyric: null,
  currentPlaylist: null,
  scrollPage: 0,
  position: 0,
  refreshPage: false,
  currentLyricIndex: null
}

export const mutations = {
  set_recieved_state (state, message) {
    state.currentLyric = message.currentLyric
    state.currentPlaylist = message.currentPlaylist
    state.scrollPage = 0
  },
  set_scroll_page (state, message) {
    if (message === 'up') {
      state.scrollPage++
    } else {
      state.scrollPage--
    }
  },
  refresh_display (state, setter) {
    state.refreshPage = setter
  },
  set_current_lyric_index (state, index) {
    state.currentLyricIndex = index
  }
}

export const actions = {
  socket_onChangedState ({ commit, dispatch, rootGetters }, message) {
    commit('set_recieved_state', message)
    if (typeof message.currentLyric === 'undefined') {
      commit('set_current_lyric_index', null)
    } else {
      commit('set_current_lyric_index', message.currentLyric)
    }
    if (message.currentPlaylist !== null) {
      dispatch('playlist/fetchPlaylist', message.currentPlaylist, { root: true })
    }
  },
  socket_onScroll ({ commit }, message) {
    commit('set_scroll_page', message)
  },
  socket_onRefresh ({ commit }) {
    commit('refresh_display', true)
    setTimeout(() => {
      commit('refresh_display', false)
    }, 200)
  },
  sendRemoteMessage ({ commit }, document) {
    this._vm.$socket.client.emit('remoteMessage', document)
  },
  sendScrollMessage ({ commit }, scroll) {
    this._vm.$socket.client.emit('remoteScroll', scroll)
  },
  stopProjection () {
    const message = {
      currentLyric: null,
      currentPlaylist: null
    }
    this._vm.$socket.client.emit('remoteMessage', message)
  },
  getCurrentState () {
    this._vm.$socket.client.emit('getCurrentState')
  },
  sendRefreshDisplay () {
    this._vm.$socket.client.emit('refreshDisplay')
  }
}

export const getters = {
  getCurrentLyric: state => {
    return state.currentLyric
  },
  getCurrentLyricIndex: state => {
    return state.currentLyricIndex
  },
  getCurrentPlaylist: state => {
    return state.currentPlaylist
  },
  getScrollDirection: state => {
    return state.scrollPage
  },
  getRefreshPageStatus: state => {
    return state.refreshPage
  }
}
