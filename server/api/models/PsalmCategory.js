import mongoose from 'mongoose';

const PsalmCategorySchema = mongoose.Schema({
  category: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('psalmsCategories', PsalmCategorySchema);