// Database schema
import mongoose from 'mongoose';

const LyricSchema = mongoose.Schema( {
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: false
    }
},
{collection: 'lyrics'});

module.exports = mongoose.model('lyrics', LyricSchema);