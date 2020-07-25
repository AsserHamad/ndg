const Contact = require('../Models/Contact');
const Errors = require('../errors/Errors');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'asserhamad96@gmail.com',
        pass: 'Gmaim1996'
    }
})

exports.getContactMessages = (req, res, next) => {
    Contact.find({})
    .then(resp => res.json(resp))
    .catch(err => {
        next(new Errors.InternalServerError());
    });
}

exports.sendMessage = (req, res, next) => {
    Contact.create(req.body)
    .then(resp => resp.toJSON())
    .then(resp => res.json(resp))
    .catch(err => next(new Errors.BaseError(err.message, err.code)));
}

exports.deleteMessage = (req, res, next) => {
    Contact.deleteOne({_id: req.body._id})
    .then(resp => res.json(resp))
    .catch(err => next(new Errors.BaseError(err.message, err.code)))
}

exports.sendEmail = (req, res, next) => {
    const mailOptions = {
        from: '"Asser Hamad" <noreply@ndg.com>',
        to: 'asserhamad96@gmail.com',
        subject: 'Nice Nodemailer test',
        text: 'Hey there, it’s our first message sent with Nodemailer ;) ', 
        html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer'
    };

    transporter.sendMail(mailOptions)
    .then(resp => res.json(resp))
    .catch(err => next(new Errors.BaseError(err.message, err.code)));
}