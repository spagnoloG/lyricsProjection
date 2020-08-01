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
    category: {
      type: String,
      required: false
    }
})