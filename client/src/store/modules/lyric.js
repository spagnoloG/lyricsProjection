import lyricsApi from '../../services/lyricsApi'

export const namespaced = true

export const state = {
  lyrics: [], // index, title and category
  categories: [],
  lyricsTotal: 0,
  currentLyric: {
    index: 0,
    title: '',
    content: '',
    categories: []
  },
  newLyricIndex: 0,
  notFound: false
}

export const mutations = {
  add_new_lyric (state, lyric) {
    state.lyrics.push(lyric)
  },
  set_lyrics (state, lyrics) {
    state.lyrics = lyrics
  },
  set_lyrics_total (state, lyricsTotal) {
    state.lyricsTotal = lyricsTotal
  },
  set_lyric (state, currentLyric) {
    state.currentLyric.title = currentLyric.title
    state.currentLyric.content = currentLyric.content
    state.currentLyric.index = currentLyric.index
    state.currentLyric.categories = currentLyric.categories
  },
  set_new_lyric_index (state, newLyricIndex) {
    state.newLyricIndex = newLyricIndex
  },
  delete_lyric (state, selector) {
    if (selector !== -1) {
      state.lyrics.splice(selector, 1)
    }
  },
  update_lyric (state, { lyric, toUpdate }) {
    if (toUpdate !== -1) {
      state.lyrics.splice(toUpdate, 1, lyric)
    }
  },
  set_categories (state, categories) {
    state.categories = categories
  },
  delete_category (state, selector) {
    if (selector !== -1) {
      state.categories.splice(selector, 1)
    }
  },
  add_new_category (state, category) {
    state.categories.push(category)
  },
  set_not_found_variable (state, found) {
    state.notFound = found
  }
}

export const actions = {
  addNewLyric ({ commit, dispatch }, lyric) {
    return lyricsApi.postLyric(lyric)
      .then(response => {
        commit('add_new_lyric', lyric)
        const alert = {
          message: 'Uspešno dodana pesem številka ' + lyric.index,
          type: 'success'
        }
        dispatch('appState/showAlert', alert, { root: true })
        return response
      })
      .catch(error => {
        const alert = {
          message: 'Napaka pri shranjevanju nove pesmi!' + lyric.index,
          type: 'error'
        }
        dispatch('appState/showAlert', alert, { root: true })
        return error
      })
  },
  //
  addNewCategory ({ commit, dispatch }, category) {
    const document = {
      category: category
    }
    return lyricsApi.postLyricCategory(document)
      .then(response => {
        commit('add_new_category', category)
        const alert = {
          message: 'Uspešno dodana nova kategorija',
          type: 'success'
        }
        dispatch('appState/showAlert', alert, { root: true })
        return response
      })
      .catch(error => {
        const alert = {
          message: 'Napaka pri shranjevanju nove kategorije!',
          type: 'error'
        }
        dispatch('appState/showAlert', alert, { root: true })
        return error
      })
  },
  //
  fetchLyric ({ commit }, index) {
    return lyricsApi.getLyric(index).then(response => {
      const data = response.data[0]
      if (typeof data === 'undefined') {
        commit('set_not_found_variable', true)
      } else {
        commit('set_lyric', data)
        commit('set_not_found_variable', false)
      }
      return data
    })
  },
  // dispatch add -> zraven commita
  fetchLyrics ({ commit }) {
    return lyricsApi.getLyricsIndexes()
      .then(response => {
        commit('set_lyrics', response.data)
        // Set new lyric index
        const helper = response.data.length - 1
        if (helper === -1) {
          commit('set_new_lyric_index', 1)
        } else {
          commit('set_new_lyric_index', response.data[helper].index + 1)
        }
        // set total lyrics count
        commit('set_lyrics_total', response.data.length)
      })
  },
  //
  fetchCategories ({ commit }) {
    var x
    const arrayOfCategories = []
    return lyricsApi.getLyricsCategories()
      .then(response => {
        for (x in response.data) {
          arrayOfCategories.push(response.data[x].category)
        }
        commit('set_categories', arrayOfCategories)
      })
  },
  //
  deleteLyric ({ commit, dispatch }, index) {
    // Find position of lyric in array by index
    const foundLyric = state.lyrics.find(lyric => lyric.index === index)
    const toDelete = state.lyrics.indexOf(foundLyric)
    if (toDelete === -1) {
      const alert = {
        message: 'Napaka pri brisanju pesmi!',
        type: 'error'
      }
      dispatch('appState/showAlert', alert, { root: true })
    }

    return lyricsApi.deleteLyric(index).then(response => {
      commit('delete_lyric', toDelete)
      if (response.status === 200) {
        const alert = {
          message: 'Pesem uspešno izbrisana',
          type: 'success'
        }
        dispatch('appState/showAlert', alert, { root: true })
      }
      return response
    })
  },
  //
  deleteCategory ({ commit, dispatch }, category) {
    const toDelete = state.categories.lastIndexOf(category)

    return lyricsApi.deleteLyricCategory(category).then(response => {
      commit('delete_category', toDelete)
      if (response.status === 200) {
        const alert = {
          message: 'Kategorija uspešno izbrisana',
          type: 'success'
        }
        dispatch('appState/showAlert', alert, { root: true })
      }
      return response
    })
  },
  //
  updateLyric ({ commit, dispatch }, lyric) {
    const index = lyric.index
    const foundLyric = state.lyrics.find(lyric => lyric.index === index)
    const toUpdate = state.lyrics.indexOf(foundLyric)
    if (toUpdate === -1) {
      const alert = {
        message: 'Napaka med posodabljanjem pesmi!',
        type: 'error'
      }
      dispatch('appState/showAlert', alert, { root: true })
    }

    return lyricsApi.updateLyric(lyric).then(response => {
      commit('update_lyric', {
        lyric,
        toUpdate
      })
      if (response.status === 200) {
        const alert = {
          message: 'Pesem uspešno posodobljena',
          type: 'success'
        }
        dispatch('appState/showAlert', alert, { root: true })
      }
      return response
    })
  }
}

export const getters = {
  getLyricByIndex: state => index => {
    return state.lyrics.find(lyric => lyric.index === index)
  },
  getAllLyrics: state => {
    return state.lyrics
  },
  getNewLyricIndex: state => {
    return state.newLyricIndex
  },
  getCategories: state => {
    return state.categories
  },
  getCurrentLyric: state => {
    return state.currentLyric
  },
  getNotFoundValue: state => {
    return state.notFound
  }
}
