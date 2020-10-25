import lyricsApi from '../../services/lyricsApi'

export const namespaced = true

export const state = {
  lyrics: [], // id, title and category
  categories: [],
  lyricsTotal: 0,
  currentLyric: null,
  notFound: true
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
    state.currentLyric = currentLyric
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
          message: 'Successfully added new lyric.',
          type: 'success'
        }
        dispatch('appState/showAlert', alert, { root: true })
        return response
      })
      .catch(error => {
        const alert = {
          message: 'Error while posting lyric to database!',
          type: 'error'
        }
        dispatch('appState/showAlert', alert, { root: true })
        return error
      })
  },

  addNewCategory ({ commit, dispatch }, category) {
    const document = {
      category: category
    }
    return lyricsApi.postLyricCategory(document)
      .then(response => {
        commit('add_new_category', category)
        const alert = {
          message: 'Successfully added new category.',
          type: 'success'
        }
        dispatch('appState/showAlert', alert, { root: true })
        return response
      })
      .catch(error => {
        const alert = {
          message: 'Error while posting category to database!',
          type: 'error'
        }
        dispatch('appState/showAlert', alert, { root: true })
        return error
      })
  },

  fetchLyric ({ commit }, lyricId) {
    return lyricsApi.getLyric(lyricId).then(response => {
      const data = response.data.lyric
      if (typeof data === 'undefined') {
        commit('set_not_found_variable', true)
      } else {
        commit('set_lyric', data)
        commit('set_not_found_variable', false)
      }
      return data
    })
  },

  fetchLyrics ({ commit }) {
    return lyricsApi.getLyricsAndIds()
      .then(response => {
        commit('set_lyrics', response.data)
        // set total lyrics count
        commit('set_lyrics_total', response.data.length)
      })
  },

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

  deleteLyric ({ commit, dispatch }, lyricId) {
    // Find position of lyric in array by index
    const foundLyric = state.lyrics.find(lyric => lyric._id === lyricId)
    const toDelete = state.lyrics.indexOf(foundLyric)
    if (toDelete === -1) {
      const alert = {
        message: 'Error while trying to delete lyric!',
        type: 'error'
      }
      dispatch('appState/showAlert', alert, { root: true })
    }

    return lyricsApi.deleteLyric(lyricId).then(response => {
      commit('delete_lyric', toDelete)
      if (response.status === 200) {
        const alert = {
          message: 'Successfuly deleted lyric.',
          type: 'success'
        }
        dispatch('appState/showAlert', alert, { root: true })
      } else {
        const alert = {
          message: 'Error while trying to delete lyric!',
          type: 'error'
        }
        dispatch('appState/showAlert', alert, { root: true })
      }
      return response
    })
  },

  deleteCategory ({ commit, dispatch }, category) {
    const toDelete = state.categories.lastIndexOf(category)
    if (toDelete === -1) {
      const alert = {
        message: 'Error while trying to delete category!',
        type: 'error'
      }
      dispatch('appState/showAlert', alert, { root: true })
    }

    return lyricsApi.deleteLyricCategory(category).then(response => {
      commit('delete_category', toDelete)
      if (response.status === 200) {
        const alert = {
          message: 'Successfuly deleted category',
          type: 'success'
        }
        dispatch('appState/showAlert', alert, { root: true })
      } else {
        const alert = {
          message: 'Error while trying to delete category!',
          type: 'error'
        }
        dispatch('appState/showAlert', alert, { root: true })
      }
      return response
    })
  },

  updateLyric ({ commit, dispatch }, lyric) {
    const id = lyric._id
    const foundLyric = state.lyrics.find(lyric => lyric._id === id)
    const toUpdate = state.lyrics.indexOf(foundLyric)
    if (toUpdate === -1) {
      const alert = {
        message: 'Error while updating lyric!',
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
          message: 'Successfully updated lyric.',
          type: 'success'
        }
        dispatch('appState/showAlert', alert, { root: true })
      }
      return response
    })
  },

  updateNotFoundVariable ({ commit }, tOrF) {
    commit('set_not_found_variable', tOrF)
  }
}

export const getters = {
  getLyricById: state => id => {
    return state.lyrics.find(lyric => lyric._id === id)
  },
  getLyricIdByNumber: state => number => {
    if (typeof state.lyrics[number] === 'undefined') {
      return -1
    } else {
      return state.lyrics[number]._id
    }
  },
  getLyricIndexById: state => id => {
    return state.lyrics.findIndex(lyric => lyric._id === id)
  },
  getAllLyrics: state => {
    return state.lyrics
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
