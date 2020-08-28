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
  getPlaylists () {
    return apiClient.get('/playlists')
  },
  getPlaylist (playlistId) {
    return apiClient.get('/playlists/' + playlistId)
  },
  deletePlaylist (playistId) {
    return apiClient.delete('/playlists/' + playlistId)
  },
  updatePlaylist (playlist) {
    return apiClient.patch('/playlists/' + playlist._id, {
      indexes: playlist.indexes,
      playlistName: playlist.playlistName,
      playlistDescription: playlist.playlistDescription
    })
  },
  postPlaylist (playlist) {
    return apiClient.post('/playlists/', playlist)
  }
}