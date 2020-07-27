const jwt = require('jsonwebtoken');
const { BaseError } = require('../errors/Errors');

exports.adminAuth = (req, res, next) => {
    console.log('verifying')
    const token = req.get('token');
    jwt.verify(token, req.app.get('secretKey'), (err, decoded) => {
        if(err)
            return next(new BaseError(err.message, err.status));
        req.body.payload = decoded;
        next();
    });
}