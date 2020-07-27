var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    /* 0: Order Project, 1: Support, 2: Other Questions*/
    subject: Number,
    message: String
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);