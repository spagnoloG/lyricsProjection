export const namespaced = true

export const state = {
  drawer: false,
  darkMode: false,
  snackbar: {
    show: false,
    content: ''
  }
}

export const mutations = {
  set_drawer_state (state, drawer) {
    state.drawer = drawer
  },
  set_global_theme (state, darkMode) {
    state.darkMode = darkMode
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
  setGlobalTheme ({ commit }, darkMode) {
    commit('set_global_theme', darkMode)
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
  getThemeState () {
    return state.darkMode
  },
  getSnackbar () {
    return state.snackbar
  }
}
