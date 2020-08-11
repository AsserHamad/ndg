const Admin = require('../Models/Admin');
const Errors = require('../errors/Errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

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
            name: req.body.name,
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

exports.getAllLanguage = (req, res, next) => {
    const en = require(path.join(__dirname,`../public/languages/en.json`));
    const ar = require(path.join(__dirname,`../public/languages/ar.json`));
    res.json({en, ar});
}

exports.adminUploadExcelFile = (req, res, next) => {
    res.json({message: 'successful boi'})
}

exports.getLanguage = (req, res, next) => {
    const lang = require(path.join(__dirname,`../public/languages/${req.body.lang}.json`));
    console.log(req.body.lang)
    console.log(lang)
    res.json(lang);
}

exports.adminUpdateLanguageText = (req, res, next) => {
    const en = req.body.en;
    const ar = req.body.ar;

    fs.writeFile(path.join(__dirname,`../public/languages/en.json`), JSON.stringify(en), (err) => {
      if (err) next(new Errors.BaseError(err, 500))
      else {
        fs.writeFile(path.join(__dirname,`../public/languages/ar.json`), JSON.stringify(ar), (err) => {
          if (err) next(new Errors.BaseError(err, 500))
          else {
            res.json({success: true})
          }
        });
      }
    });
}