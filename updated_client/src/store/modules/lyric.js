import fetchLyrics from '../../services/FetchLyrics'

export const namespaced = true;

export const state = {
  lyrics: [],
  lyricsTotal: 0,
  currentLyric: {
    title: "",
    content: "",
    index: 0
  },
  newLyricIndex: 0
};

export const mutations = {
  add_new_lyric(state, lyric) {
    state.lyrics.push(lyric);
  },
  set_lyrics(state, lyrics) {
    state.lyrics = lyrics;
  },
  set_lyrics_total(state, lyricsTotal) {
    state.lyricsTotal = lyricsTotal;
  },
  set_lyric(state, currentLyric) {
    state.currentLyric.title = currentLyric.title;
    state.currentLyric.content = currentLyric.content;
    state.currentLyric.index = currentLyric.index;
  },
  set_new_lyric_index(state, newLyricIndex) {
    state.newLyricIndex = newLyricIndex;
  },
  delete_lyric(state, selector) {
    if (selector != -1) {
      state.lyrics.splice(selector, 1);
    }
  },
  update_lyric(state, { lyric, toUpdate }) {
    if (toUpdate != -1) {
      //Object.assign(state.lyrics[toUpdate], lyric);
      //state.lyrics[toUpdate] = lyric
      //https://github.com/vuejs/vuex/blob/dev/examples/todomvc/store/mutations.js
      state.lyrics.splice(toUpdate, 1, lyric);
      console.log(state.lyrics[toUpdate]);
    }
  }
};

export const actions = {
  addNewLyric({ commit }, lyric) {
    return fetchLyrics.postLyric(lyric)
      .then(response => {
        commit('add_new_lyric', lyric);
        // Add response check
        return response;
      })
      .catch(error => {
        return error;
      });
  },
  //dispatch add -> zraven commita
  fetchLyrics({ commit }) {
    return fetchLyrics.getLyrics().then(response => {
      commit('set_lyrics', response.data);
      // SET NEW LYRIC INDEX
      let helper = response.data.length - 1;
      if (helper === -1) {
        commit('set_new_lyric_index', 1);
      } else {
        commit('set_new_lyric_index', response.data[helper].index + 1);
      }
      // SET LYRICS TOTAL
      commit('set_lyrics_total', response.data.length);
    });
    // .catch(error => {
    //     const notification = {
    //         type: 'error',
    //         message: 'There was a problem fetching lyrics: ' + error.message
    //     }
    //     dispatch('notification/add', notification, { root: true })
    // })
  },
  fetchLyric({ commit, getters }, index) {
    // if (index == state.currentLyric.index) {
    //     return state.currentLyric
    // }

    var lyric = getters.getLyricByIndex(index);

    if (lyric) {
      commit('set_lyric', lyric);
      return lyric;
    } else {
      return fetchLyrics.getLyric(index).then(response => {
        let data = response.data[0];
        if (typeof data === "undefined") {
          //catch error -> TO DO
        } else {
          commit('set_lyric', data);
        }
        return data;
      });
    }
  },
  /**
   * @param {Object} context - context object passed to the function automatically by VueX
   * @param {Number} index - Index of the lyric that is to be deleted
   *
   * @returns { Object } - Response object returned from the API
   */
  deleteLyric({ commit }, index) {
    // Find position of lyric in array by index
    let foundLyric = state.lyrics.find(lyric => lyric.index === index);
    let toDelete = state.lyrics.indexOf(foundLyric);

    return fetchLyrics.deleteLyric(index).then(response => {
      commit('delete_lyric', toDelete);
      // Add a isSuccsesful check to response
      return response;
    });
    // .catch(error => {
    //     const notification = {
    //         type: 'error',
    //         message: 'There was a problem deleting lyric: ' + error.message
    //     }
    //     dispatch('notification/add', notification, { root: true })
    // })
  },
  updateLyric({ commit }, lyric) {
    let index = lyric.index;
    let foundLyric = state.lyrics.find(lyric => lyric.index === index);
    let toUpdate = state.lyrics.indexOf(foundLyric);

    return fetchLyrics.updateLyric(lyric).then(response => {
      commit('update_lyric', {
        lyric,
        toUpdate
      });
      // Add a isSuccsesful check to response
      return response;
    });
    // .catch(error => {
    //     const notification = {
    //         type: 'error',
    //         message: 'There was a problem deleting lyric: ' + error.message
    //     }
    //     dispatch('notification/add', notification, { root: true })
    // })
  }
};

export const getters = {
  getLyricByIndex: state => index => {
    return state.lyrics.find(lyric => lyric.index === index);
  },
  getAllLyrics: state => {
    return state.lyrics;
  }
};
