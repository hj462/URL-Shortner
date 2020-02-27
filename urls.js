const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const urlSchema = new Schema({
  url: {
    type: String,
  },
  short_url: {
    type: String
  }
}, {
  timestamps: true,
});

const URLshortner = mongoose.model('URL', urlSchema);

module.exports = URLshortner;
