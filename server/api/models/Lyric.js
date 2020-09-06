// Database schema
import mongoose from 'mongoose';

const LyricSchema = mongoose.Schema( {
    index: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: Object,
        required: true
    },
    categories: {
        type: Array,
        required: false
    }
},
{collection: 'lyrics'});

module.exports = mongoose.model('lyrics', LyricSchema);