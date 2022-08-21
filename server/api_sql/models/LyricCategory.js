import mongoose from 'mongoose';

const LyricCategorySchema = mongoose.Schema({
  category: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('lyricsCategories', LyricCategorySchema);