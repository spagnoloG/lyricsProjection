export const namespaced = true

export const state = {
  drawer: false,
  alert: {
    show: false,
    message: '',
    type: ''
  },
  stateId: null,
  marginLeft: null,
  marginRight: null,
  organisation: null,
  appName: null
}

export const mutations = {
  set_drawer_state (state, drawer) {
    state.drawer = drawer
  },
  show_alert (state, alert) {
    state.alert = alert
  },
  hide_alert (state, alert) {
    state.alert.show = false
  }
}

export const actions = {
  setDrawerState ({ commit }, drawer) {
    commit('set_drawer_state', drawer)
  },
  showAlert ({ commit }, alertInfo) {
    const alert = {
      show: true,
      message: alertInfo.message,
      type: alertInfo.type
    }
    commit('show_alert', alert)
    if (alertInfo.type === 'error' || alertInfo.type === 'success') {
      setTimeout(() => {
        commit('hide_alert')
      }, 3000)
    }
  },
  hideAlert ({ commit }) {
    commit('hide_alert')
  }
}

export const getters = {
  getDrawerState () {
    return state.drawer
  },
  getAlert () {
    return state.alert
  }
}
