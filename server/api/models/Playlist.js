const mongoose = require('mongoose');

const playlistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    indexes: {
        type: Array,
        required: true
    },
    playlistName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Playlist', playlistSchema);