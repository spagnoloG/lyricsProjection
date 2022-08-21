const mongoose = require('mongoose');

const playlistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ids: {
        type: Array,
        required: true
    },
    playlistName: {
        type: String,
        required: true
    },
    playlistDescription: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Playlist', playlistSchema);