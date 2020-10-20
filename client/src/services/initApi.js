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
  getState () {
    return apiClient.get('/state')
  },
  postInitialState (state) {
    return apiClient.post('/state/', state)
  },
  updateState (state) {
    return apiClient.patch('state' + state._id, state)
  }
}
