const Contact = require('../Models/Contact');
const Errors = require('../errors/Errors');

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
    Contact.deleteOne({_id: req.body.id})
    .then(resp => res.json(resp))
    .catch(err => next(new Errors.BaseError(err.message, err.code)))
}