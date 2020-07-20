const Admin = require('../Models/Admin');
const Errors = require('../errors/Errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.verifyValidity = (req, res, next) => {
    const token = req.get('token');
    jwt.verify(token, req.app.get('secretKey'), (err, decoded) => {
        if(err)
            next(new Errors.BaseError(err.message, 500))
        res.json(decoded)
    })
}

exports.adminRegister = (req, res, next) => {
    const pass = req.body.password;
    const saltRounds = 10;
    bcrypt.hash(pass, saltRounds, function(err, hash){
        if(err)
            next(new Errors.InternalServerError());

        const admin = {
            username: req.body.username,
            email: req.body.email,
            password: hash
        };
        Admin.create(admin)
        .then(resp => resp.toJSON())
        .then(resp => {
            delete resp["password"];
            res.json(resp);
        })
        .catch(err => next(new Errors.BaseError(err.message, 400)));
    });
}

exports.adminLogin = (req, res, next) => {
    console.log(req.body);
    Admin.findOne({username: req.body.username.toLowerCase()})
    .then(resp => resp.toJSON())
    .then(admin => {
        bcrypt.compare(req.body.password, admin.password, function(err, result){
            delete admin.password;
            if (err)
                return next(new Errors.InternalServerError());
            if(result){
                const token = jwt.sign({ admin }, req.app.get('secretKey'), {
                    expiresIn: '10h'});
                res.json({status:"success", message: "admin found", data:{admin, token}});
            } else {
                next(new Errors.BaseError("Incorrect password", 400));
            }
        })
    })
    .catch((err) => next(new Errors.BaseError('Username does not exist', 401)));
}

exports.adminUpdateEmail = (req, res, next) => {
    const payload = req.body.data,
          email = req.body.email;
    Admin.updateOne({payload}, {email}, {new: true})
    .then(resp => resp.toJSON())
    .then(admin => {
        delete admin.password;
        res.json(admin);
    })
}