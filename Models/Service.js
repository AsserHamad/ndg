var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
Categories:

*/
var serviceSchema = new Schema({
    title: {
      en: {
        type: String,
        required: true
      },
      ar: {
        type: String,
        required: true
      }
    },
    description: {
      en: String,
      ar: String
    },
    category: Number,
    images: [String],
    videos: [String]
});

module.exports = mongoose.model('Service', serviceSchema);