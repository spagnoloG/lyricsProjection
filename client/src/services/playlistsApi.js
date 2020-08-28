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
    console.log(playlist)
    return apiClient.patch('/playlists/' + playlist._id, {
      indexes: playlist.indexes,
      playlistName: playlist.playlistName,
      playlistDescription: playlist.playlistDescription
    })
  },
  postPlaylist (playlist) {
    const playlistToPost = {
      indexes: playlist.indexes,
      playlistName: playlist.playlistName,
      playlistDescription: playlist.playlistDescription
    }
    console.log(playlistToPost)
    return apiClient.post('/playlists', playlistToPost)
  }
}
