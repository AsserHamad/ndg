const Service = require('../Models/Service');
const Errors = require('../errors/Errors');

exports.getServices = (req, res, next) => {
    Service.find({})
    .then(resp => res.json(resp))
    .catch(err => {
        next(new Errors.BaseError(err.message, err.status));
    });
}

exports.createService = (req, res, next) => {
    Service.create(req.body)
    .then(resp => res.json(resp))
    .catch(err => {
        next(new Errors.BaseError({
            reason: err.message,
            status: 400
        }));
    });
};

exports.updateService = (req, res, next) => {
    Service.updateOne({_id: req.body._id}, req.body.service, {new: true})
    .then(resp => res.json(resp))
    .catch(err => {
        next(new Errors.BaseError(err.message, err.status));
    });
};

exports.deleteService = (req, res, next) => {
    Service.deleteOne(req.body)
    .then(resp => res.json(resp))
    .catch(err => {
        next(new Errors.BaseError(err.message, err.status));
    });
};

exports.deleteAllServices = (req, res, next) => {
    Service.deleteMany({_id: req.body._id})
    .then(resp => res.json(resp))
    .catch(err => {
        next(new Errors.NotFoundError({
            reason: 'There is no service under those values'
        }));
    });
}