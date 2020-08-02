import mongoose, { mongo } from 'mongoose';

const LyricCategorySchema = mongoose.Schema({
  category: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('lyricsCategories', LyricCategorySchema);