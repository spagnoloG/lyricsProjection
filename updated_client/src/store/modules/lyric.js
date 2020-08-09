import fetchLyrics from '../../services/fetchLyrics'

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
  newLyricIndex: 0
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
  }
}

export const actions = {
  addNewLyric ({ commit }, lyric) {
    return fetchLyrics.postLyric(lyric)
      .then(response => {
        commit('add_new_lyric', lyric)
        // Add response check
        return response
      })
      .catch(error => {
        return error
      })
  },
  //
  addNewCategory ({ commit }, category) {
    const document = {
      category: category
    }
    return fetchLyrics.postLyricCategory(document)
      .then(response => {
        commit('add_new_category', category)
        return response
      })
      .catch(error => {
        return error
      })
  },
  //
  fetchLyric ({ commit, getters }, index) {
    return fetchLyrics.getLyric(index).then(response => {
      const data = response.data[0]
      if (typeof data === 'undefined') {
        // catch error -> TO DO
      } else {
        commit('set_lyric', data)
      }
      return data
    })
  },
  // dispatch add -> zraven commita
  fetchLyrics ({ commit }) {
    return fetchLyrics.getPsalmsIndexes()
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
    return fetchLyrics.getLyricsCategories()
      .then(response => {
        for (x in response.data) {
          arrayOfCategories.push(response.data[x].category)
        }
        commit('set_categories', arrayOfCategories)
      })
  },
  //
  deleteLyric ({ commit }, index) {
    // Find position of lyric in array by index
    const foundLyric = state.lyrics.find(lyric => lyric.index === index)
    const toDelete = state.lyrics.indexOf(foundLyric)

    return fetchLyrics.deleteLyric(index).then(response => {
      commit('delete_lyric', toDelete)
      return response
    })
  },
  //
  deleteCategory ({ commit }, category) {
    const toDelete = state.categories.lastIndexOf(category)

    return fetchLyrics.deleteLyricCategory(category).then(response => {
      commit('delete_category', toDelete)
      return response
    })
  },
  //
  updateLyric ({ commit }, lyric) {
    const index = lyric.index
    const foundLyric = state.lyrics.find(lyric => lyric.index === index)
    const toUpdate = state.lyrics.indexOf(foundLyric)

    return fetchLyrics.updateLyric(lyric).then(response => {
      commit('update_lyric', {
        lyric,
        toUpdate
      })
      // Add a isSuccsesful check to response
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
  }
}
