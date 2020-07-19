const Project = require('../Models/Project');
const Errors = require('../errors/Errors');
const { response } = require('express');

exports.getProjects = (req, res, next) => {
    Project.find({})
    .then(resp => res.json(resp))
    .catch(err => {
        next(new Errors.InternalServerError());
    });
}

exports.getProject = (req, res, next) => {
    Project.findOne({_id: req.params.id})
    .then(resp => (resp) ? res.json(resp) : next(new Errors.NotFoundError()))
    .catch(err => next(new Errors.BaseError(err.message, 404)))
}

exports.getExampleProjects = (req, res, next) => {
    Project.find({})
    .limit(3)
    .then(resp => res.json(resp))
    .catch(err => {
        next(new Errors.InternalServerError());
    });
}

exports.createProject = (req, res, next) => {
    Project.create(req.body.project)
    .then(resp => resp.toJSON())
    .then(resp => res.json(resp))
    .catch(err => {
        next(new Errors.BaseError({
            reason: err.message,
            status: 400
        }));
    });
};

exports.updateProject = (req, res, next) => {
    Project.updateOne({_id: req.body.id}, req.body.project, {new: true})
    .then(resp => resp ? res.json(resp) : next(new Errors.NotFoundError()))
    .catch(err => {
        next(new Errors.BaseError({
            reason: err.message,
            status: 400
        }));
    });
};

exports.deleteProject = (req, res, next) => {
    Project.deleteOne(req.body.project)
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