import fetchPsalms from '../../services/fetchPsalms'

export const namespaced = true

export const state = {
  psalms: [], // index, title and category
  psalmsTotal: 0,
  currentPsalm: {
    index: 0,
    title: '',
    content: '',
    category: ''
  },
  newPsalmIndex: 0
}

export const mutations = {
  add_new_psalm (state, psalm) {
    state.psalms.push(psalm)
  },
  set_psalms (state, psalms) {
    state.psalms = psalms
  },
  set_psalms_total (state, psalmsTotal) {
    state.psalmsTotal = psalmsTotal
  },
  set_psalm (state, currentPsalm) {
    state.currentPsalm.index = currentPsalm.index
    state.currentPsalm.title = currentPsalm.title
    state.currentPsalm.content = currentPsalm.content
    state.currentPsalm.category = currentPsalm.category
  },
  set_new_psalm_index (state, newPsalmIndex) {
    state.newPsalmIndex = newPsalmIndex
  },
  delete_psalm (state, selector) {
    if (selector !== -1) {
      state.psalms.splice(selector, 1)
    }
  },
  update_psalm (state, { psalm, toUpdate }) {
    if (toUpdate !== -1) {
      state.psalms.splice(toUpdate, 1, psalm)
    }
  }
}

export const actions = {
  addNewPsalm ({ commit }, psalm) {
    return fetchPsalms.postPsalm(psalm)
      .then(response => {
        // To check!
        commit('add_new_psalm', psalm)
        return response
      })
      .catch(error => {
        return error
      })
  },
  //
  fetchPsalm ({ commit }, index) {
    return fetchPsalms.getPsalm(index)
      .then(response => {
        const data = response.data[0]
        if (typeof data === 'undefined') {
          // catch error -> To do
        } else {
          commit('set_psalm', data)
        }
        return data
      })
  },
  //
  fetchPsalms ({ commit }) {
    return fetchPsalms.getPsalmsIndexes
      .then(response => {
        commit('set_psalms', response.data)

        // Set new Psalm index
        const helper = response.data.length - 1
        if (helper === -1) {
          commit('set_new_psalm_index', 1)
        } else {
          commit('set_new_psalm_index', response.data[helper].index + 1)
        }

        // Set total Psalm count
        commit('set_psalms_total', response.data.length)
      })
  },
  //
  deletePsalm ({ commit }, index) {
    // Find position of Psalm in array by index
    const foundPsalm = state.psalms.find(psalm => psalm.index === index)
    const toDelete = state.psalms.indexOf(foundPsalm)

    return fetchPsalms.deletePsalm(index).then(response => {
      commit('delete_psalm', toDelete)
      return response
    })
  },
  //
  updatePsalm ({ commit }, psalm) {
    const index = psalm.index
    const foundPsalm = state.psalms.find(psalm => psalm.index === index)
    const toUpdate = state.psalms.indexOf(foundPsalm)

    return fetchPsalms.updatePsalm(psalm).then(response => {
      commit('update_psalm', {
        psalm,
        toUpdate
      })
      // Add a isSuccsesful check to response
      return response
    })
  }

}

export const getters = {
  getPsalmByIndex: state => index => {
    return state.psalms.find(psalm => psalm.index === index)
  },
  getAllPsalms: state => {
    return state.psalms
  }
}
