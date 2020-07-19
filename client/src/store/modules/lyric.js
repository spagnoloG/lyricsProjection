import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
    lyrics: [],
    lyricsTotal: 0,
    currentLyric: {}
}

export const mutations = {
    SET_LYRICS(state, lyrics) {
        state.lyrics = lyrics
    },
    SET_LYRICS_TOTAL(state, lyricsTotal) {
        state.lyricsTotal = lyricsTotal
    },
    SET_LYRIC(state, lyric) {
        state.lyric = lyric
    }
}

export const actions = {
    fetchLyrics( {commit, dispatch}) {
        return EventService.getLyrics()
            .then(response => {
                commit('SET_LYRICS_TOTAL', parseInt(response.headers['x-total-count']))
                commit('SET_LYRICS', response.data)
            })
            .catch(error => {
                const notification = {
                    type: 'error',
                    message: 'There was a problem fetching lyrics: ' + error.message
                }
                dispatch('notification/add', notification, {root: true})
            })
    },
    fetchLyric({commit, getters, state}, index) { 
        if(index == state.lyric.index) {
            return state.lyric
        }

        var lyric = getters.getLyricByIndex(index)

        if(lyric) {
            commit('SET_LYRIC', lyric)
            return lyric
        } else {
            return EventService.getLyric(index).then(response => {
                commit('SET_LYRIC', response.data)
                return response.data
            })
        }
    }
}

export const getters = {
    getLyricByIndex: state => index => {
        return state.lyrics.find(lyric => lyric.index === index)
    }
}