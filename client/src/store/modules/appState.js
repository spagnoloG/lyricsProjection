import initApi from '../../services/initApi'

export const namespaced = true

export const state = {
  drawer: false,
  alert: {
    show: false,
    message: '',
    type: ''
  },
  appState: {},
  connectedToDb: true,
  locale: 'en'
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
  },
  set_state (state, message) {
    state.appState = message
  },
  set_connection_to_db (state, isConnected) {
    state.connectedToDb = isConnected
  },
  set_locale (state, locale) {
    state.locale = locale
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
  },

  fetchState ({ commit }) {
    return initApi.getState()
      .then(response => {
        if (Object.keys(response.data).length === 0) {
          commit('set_connection_to_db', true)
        } else {
          commit('set_state', response.data.state)
          commit('set_connection_to_db', true)
        }
        // Define locale from localStorage
        commit('set_locale', localStorage.getItem('locale') ? localStorage.getItem('locale') : 'en')
        return response
      })
      .catch(err => {
        if (!err.response) {
          commit('set_connection_to_db', false)
        }
        return err
      })
  },

  postInitialState ({ commit }, message) {
    localStorage.setItem('state', JSON.stringify(message))
    return initApi.postInitialState(message)
      .then(response => {
        commit('set_state', message)
      })
      .catch(err => {
        return err
      })
  },

  updateState ({ commit, dispatch }, message) {
    localStorage.setItem('state', JSON.stringify(message))
    return initApi.updateState(message)
      .then(response => {
        commit('set_state', message)
        const alert = {
          message: 'Successfully updated App info.',
          type: 'success'
        }
        dispatch('appState/showAlert', alert, { root: true })
        return response
      })
      .catch(err => {
        const alert = {
          message: 'Error while updating App info',
          type: 'error'
        }
        dispatch('appState/showAlert', alert, { root: true })
        return err
      })
  },

  setStateFromStorage ({ commit }, message) {
    localStorage.setItem('state', JSON.stringify(message))
    commit('set_state', message)
  },

  changeLocale ({ commit }, message) {
    localStorage.setItem('locale', message)
    commit('set_locale', message)
  }
}

export const getters = {
  getDrawerState () {
    return state.drawer
  },
  getAlert () {
    return state.alert
  },
  getAppState () {
    if (Object.keys(state.appState).length === 0 && state.appState.constructor === Object) {
      return -1
    } else {
      return state.appState
    }
  },
  getDbConnection () {
    return state.connectedToDb
  },
  getLocale () {
    return state.locale
  }
}
