var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    name: String,
    email: String,
    phone: Number,
    /* 0: Order Project, 1: Support, 2: Other Questions*/
    subject: Number,
    message: String
});

module.exports = mongoose.model('Contact', contactSchema);