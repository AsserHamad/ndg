const Service = require('../Models/Service');
const Errors = require('../errors/Errors');

exports.getServices = (req, res, next) => {
    Service.find({})
    .then(resp => res.json(resp))
    .catch(err => {
        next(new Errors.InternalServerError());
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

exports.deleteService = (req, res, next) => {
    Service.deleteOne(req.body)
    .then(resp => res.json(resp))
    .catch(err => {
        next(new Errors.NotFoundError({
            reason: 'There is no service under those values'
        }));
    });
};

exports.deleteAllServices = (req, res, next) => {
    Service.deleteMany(req.body)
    .then(resp => res.json(resp))
    .catch(err => {
        next(new Errors.NotFoundError({
            reason: 'There is no service under those values'
        }));
    });
}