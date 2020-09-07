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
  getLyric (index) {
    return apiClient.get('/lyrics/' + index)
  },
  deleteLyric (index) {
    return apiClient.delete('/lyrics/' + index)
  },
  deleteLyricCategory (category) {
    return apiClient.delete('/lyricsc/' + category)
  },
  updateLyric (lyric) {
    return apiClient.patch('/lyrics/' + lyric.index, {
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
