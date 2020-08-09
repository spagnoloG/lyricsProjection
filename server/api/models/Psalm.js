import mongoose from 'mongoose';

const PsalmSchema = mongoose.Schema({
    index: {
      type: Number,
      required: true
    },
    title : {
      type: String,
      required: true
    },
    content : {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: false
    }
},
{collection: 'psalms'});

module.exports = mongoose.model('psalms', PsalmSchema);