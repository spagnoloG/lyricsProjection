// // This service handles api calls to the server
// import axios from 'axios'

// const apiClient = axios.create( {
//     baseURL: `http://localhost:9000`,
//     withCredentials: false,
//     headers: {
//         Accept: 'aplication/json',
//         'Content-Type': 'application/json'
//     },
//     timeout: 10000
// });

// export default {
//     getAllLyrics() {
//         return apiClient.get('/lyrics');
//     },
//     getSpecificLyric(lyricIndex) {
//         return apiClient.get('/lyrics/' + lyricIndex);
//     },
//     submitLyric(lyric) {
//         return apiClient.post('/lyrics', lyric);
//     },
//     updateLyric(lyricIndex, lyric) {
//         return apiClient.patch('/lyrics/' + lyricIndex, lyric);
//     },
//     deleteLyric(lyricIndex) {
//         return apiClient.delete('/lyrics/' + lyricIndex);
//     }
// }
