import axios from 'axios'

const apiClient = axios.create({
    baseURL: `http://localhost:9000`,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json'
    },
    timeout: 10000
})

export default {
    getLyrics() {
        return apiClient.get('/lyrics')
    },
    getLyric(index) {
        return apiClient.get('/lyrics/' + index)
    },
    deleteLyric(index) {
        return apiClient.delete('/lyrics/' + index)
    },
    updateLyric(lyric) {
        return apiClient.patch('/lyrics/' + lyric.index, {
            title: lyric.title,
            content: lyric.content
        })
    },
    postLyric(lyric) {
        return apiClient.post('/lyrics/', lyric)
    }
}