const Project = require('../Models/Project');
const Errors = require('../errors/Errors');

exports.getProjects = (req, res, next) => {
    console.log("yo")
    Project.find({})
    .then(resp => {console.log(res);res.json(resp)})
    .catch(err => {
        next(new Errors.InternalServerError());
    });
}

exports.createProject = (req, res, next) => {
    Project.create(req.body)
    .then(resp => res.json(resp))
    .catch(err => {
        next(new Errors.BaseError({
            reason: err.message,
            code: 400
        }));
    });
};

exports.deleteProject = (req, res, next) => {
    Project.deleteOne(req.body)
    .then(resp => res.json(resp))
    .catch(err => {
        next(new Errors.NotFoundError({
            reason: 'There is no project under those values'
        }));
    });
};

exports.deleteAllProjects = (req, res, next) => {
    Project.deleteMany(req.body)
    .then(resp => res.json(resp))
    .catch(err => {
        next(new Errors.NotFoundError({
            reason: 'There is no project under those values'
        }));
    });
}