export const namespaced = true

export const state = {
  currentLyric: -1,
  currentPlaylist: -1
}

export const mutations = {
  set_recieved_state (state, message) {
    state.currentLyric = message.currentLyric
    state.currentPlaylist = message.currentPlaylist
  }
}

export const actions = {
  socket_onChangedState ({ commit }, message) {
    commit('set_recieved_state', message)
  },
  sendRemoteMessage ({ commit }, document) {
    this._vm.$socket.client.emit('remoteMessage', document)
  },
  stopProjection () {
    const message = {
      currentLyric: -1,
      currentPlaylist: -1
    }
    this._vm.$socket.client.emit('remoteMessage', message)
  },
  getCurrentState () {
    this._vm.$socket.client.emit('getCurrentState')
  }
}

export const getters = {
  getCurrentLyric: state => {
    return state.currentLyric
  },
  getCurrentPlaylist: state => {
    return state.currentPlaylist
  }
}
