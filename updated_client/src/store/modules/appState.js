export const namespaced = true

export const state = {
  drawer: false,
  snackbar: {
    show: false,
    content: ''
  }
}

export const mutations = {
  set_drawer_state (state, drawer) {
    state.drawer = drawer
  },
  show_snackbar (state, snackbar) {
    state.snackbar = snackbar
  },
  hide_snackbar (state, snackbar) {
    state.snackbar.show = false
  }
}

export const actions = {
  setDrawerState ({ commit }, drawer) {
    commit('set_drawer_state', drawer)
  },
  showSnackbar ({ commit }, notification) {
    const snackbar = {
      show: true,
      content: notification
    }
    commit('show_snackbar', snackbar)
  },
  hideSnackbar ({ commit }) {
    commit('hide_snackbar')
  }
}

export const getters = {
  getDrawerState () {
    return state.drawer
  },
  getSnackbar () {
    return state.snackbar
  }
}
