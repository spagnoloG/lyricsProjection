import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
    lyrics: [],
    lyricsTotal: 0,
    currentLyric: {
        title: "",
        content: "",
        index: 1
    },
    newLyricIndex: 0
}

export const mutations = {
    SET_LYRICS(state, lyrics) {
        state.lyrics = lyrics
    },
    SET_LYRICS_TOTAL(state, lyricsTotal) {
        state.lyricsTotal = lyricsTotal
    },
    SET_LYRIC(state, currentLyric) {
        state.currentLyric.title = currentLyric.title
        state.currentLyric.content = currentLyric.content
        state.currentLyric.index = currentLyric.index
    },
    SET_NEW_LYRIC_INDEX(state, newLyricIndex) {
        state.newLyricIndex = newLyricIndex
    },
    DELETE_LYRIC(state, selector) {
        if (selector != -1) {
            state.lyrics.splice(selector, 1)
        }
    },
    UPDATE_LYRIC(state, selector, lyric) {
        if (selector != -1) {
            state.lyrics[selector] = lyric
        }
    }

}

export const actions = {
    fetchLyrics({ commit, dispatch }) {
        return EventService.getLyrics()
            .then(response => {
                commit('SET_LYRICS', response.data)
                // SET NEW LYRIC INDEX
                let helper = response.data.length - 1;
                if (helper === -1) {
                    commit('SET_NEW_LYRIC_INDEX', 1)
                } else {
                    //this.index = this.lyrics[helper].index + 1;
                    commit('SET_NEW_LYRIC_INDEX', response.data[helper].index)
                }
                // SET LYRICS TOTAL
                commit('SET_LYRICS_TOTAL', response.data.length)
            })
            .catch(error => {
                const notification = {
                    type: 'error',
                    message: 'There was a problem fetching lyrics: ' + error.message
                }
                dispatch('notification/add', notification, { root: true })
            })
    },
    fetchLyric({ commit, getters, state }, index) {
        if (index == state.currentLyric.index) {
            return state.currentLyric
        }

        var lyric = getters.getLyricByIndex(index)

        if (lyric) {
            commit('SET_LYRIC', lyric)
            return lyric
        } else {
            return EventService.getLyric(index).then(response => {
                let data = response.data[0]
                if (typeof data === 'undefined') {
                    //catch error -> TO DO
                } else {
                    commit('SET_LYRIC', data)
                }
                return data;
            })
        }
    },
    deleteLyric({ commit, state }, index) {
        // Find position in state array!
        let selector = state.index.indexOf(index)
        console.log("Selector: " + selector)

        return EventService.deleteLyric(index)
            .then(response => {
                commit('DELETE_LYRIC', selector)
                // Add a isSuccsesful check to response
                return response;
            })
            .catch(error => {
                const notification = {
                    type: 'error',
                    message: 'There was a problem deleting lyric: ' + error.message
                }
                dispatch('notification/add', notification, { root: true })
            })
    },
    updateLyric({ commit, state }, lyric) {
        // Find position in state array!
        let selector = state.index.indexOf(lyric.index)

        return EventService.updateLyric(lyric)
            .then(response => {
                commit('UPDATE_LYRIC', selector)
                // Add a isSuccsesful check to response
                return response;
            })
            .catch(error => {
                const notification = {
                    type: 'error',
                    message: 'There was a problem deleting lyric: ' + error.message
                }
                dispatch('notification/add', notification, { root: true })
            })
    }
}

export const getters = {
    getLyricByIndex: state => index => {
        return state.lyrics.find(lyric => lyric.index === index)
    }
}