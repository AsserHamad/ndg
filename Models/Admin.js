var mongoose = require('mongoose');
const { BaseError } = require('../errors/Errors');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
          validator: (v) => /\S+@\S+\.\S+/.test(v),
          message: props => `This is not a valid email`
        },
    },
    password: {
        type: String,
        required: true,
        validate: {
          validator: (v) => /.{8,15}/.test(v),
          message: props => `Password should contain between 8 and 15 characters`
        },
    }
});

adminSchema.pre('save', function(next){
    const username = this.username, email = this.email;
    adminModel.findOne({
        $or: [
            {username},
            {email}
        ]}, function(err, user){
        if(err)
            next(new BaseError(err.message, 401))
        if(!user)
            next();
        else {
            const message = (user.username === username) ? "Username taken" : "Email already in use";
            next(new BaseError(message, 400));
        }
    })
})

const adminModel = mongoose.model('Admin', adminSchema);


module.exports = adminModel;