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
        type: String
      }
    },
    image: String,
    items: {
      en: [String],
      ar: [String]
    }
});

module.exports = mongoose.model('Service', serviceSchema);