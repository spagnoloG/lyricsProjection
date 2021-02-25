const mongoose = require('mongoose');

const appSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  appName: {
    type: String,
    required: false,
  },
  organisation: {
    type: String,
    required: true
  },
  marginLeft: {
    type: Number,
    required: false
  },
  marginRight: {
    type: Number,
    required: false
  }
})

module.exports = mongoose.model('App', appSchema)