import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://' + window.location.hostname + ':4200',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

export default {
  getLyrics () {
    return apiClient.get('/lyrics')
  },
  getLyricsIndexes () {
    return apiClient.get('/lyricsit')
  },
  getLyricsCategories () {
    return apiClient.get('/lyricsc')
  },
  getLyric (lyricId) {
    return apiClient.get('/lyrics/' + lyricId)
  },
  deleteLyric (lyricId) {
    return apiClient.delete('/lyrics/' + lyricId)
  },
  deleteLyricCategory (category) {
    return apiClient.delete('/lyricsc/' + category)
  },
  updateLyric (lyric) {
    return apiClient.patch('/lyrics/' + lyric._id, {
      title: lyric.title,
      content: String(lyric.content),
      categories: lyric.categories
    })
  },
  postLyric (lyric) {
    return apiClient.post('/lyrics/', lyric)
  },
  postLyricCategory (category) {
    return apiClient.post('/lyricsc/', category)
  }
}
