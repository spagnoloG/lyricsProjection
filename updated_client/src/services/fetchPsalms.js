import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://' + window.location.hostname + ':9000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

export default {
  getPsalms () {
    return apiClient.get('/psalms')
  },
  getPsalmsIndexes () {
    return apiClient.get('/psalmsit')
  },
  getPsalmsCategories () {
    return apiClient.get('/psalmsc')
  },
  getPsalm (index) {
    return apiClient.get('/psalms/' + index)
  },
  deletePsalm (index) {
    return apiClient.delete('/psalms/' + index)
  },
  deletePsalmCategory (category) {
    return apiClient.delete('/psalmsc/' + category)
  },
  updatePsalm (psalm) {
    return apiClient.patch('/psalms/' + psalm.index, {
      title: psalm.title,
      content: psalm.content,
      categories: psalm.categories
    })
  },
  postPsalm (psalm) {
    return apiClient.post('/psalms/', psalm)
  },
  postPsalmCategory (category) {
    return apiClient.post('/psalmsc/', category)
  }
}
