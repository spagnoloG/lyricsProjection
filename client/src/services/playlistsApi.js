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
  deletePlaylist (playlistId) {
    return apiClient.delete('/playlists/' + playlistId)
  },
  updatePlaylist (playlist) {
    return apiClient.patch('/playlists/' + playlist._id, {
      ids: playlist.ids,
      playlistName: playlist.playlistName,
      playlistDescription: playlist.playlistDescription
    })
  },
  postPlaylist (playlist) {
    const playlistToPost = {
      ids: playlist.ids,
      playlistName: playlist.playlistName,
      playlistDescription: playlist.playlistDescription
    }
    return apiClient.post('/playlists', playlistToPost)
  }
}
