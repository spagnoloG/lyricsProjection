export const namespaced = true

export const state = {
  drawer: false,
  darkMode: false
}

export const mutations = {
  set_drawer_state (state, drawer) {
    state.drawer = drawer
  },
  set_global_theme (state, darkMode) {
    state.darkMode = darkMode
  }
}

export const actions = {
  setDrawerState ({ commit }, drawer) {
    commit('set_drawer_state', drawer)
  },
  setGlobalTheme ({ commit }, darkMode) {
    commit('set_global_theme', darkMode)
  }
}

export const getters = {
  getDrawerState () {
    return state.drawer
  },
  getThemeState () {
    return state.darkMode
  }
}
