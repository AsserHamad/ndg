var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const BaseError = require("./errors/BaseError");
const cors = require("cors");
const mongoose = require('mongoose');

// require('dotenv').config();

const adminRouter = require('./routes/admin');
const projectRouter = require('./routes/projects');
const servicesRouter = require('./routes/services');
const contactRouter = require('./routes/contact');

var app = express();

mongoose.connect("mongodb://asserhamad:abc123456@ds217799.mlab.com:17799/ndg-website", {useNewUrlParser: true, useUnifiedTopology: true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('secretKey', "abcd1234");

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/admin', adminRouter);
app.use('/api/projects', projectRouter);
app.use('/api/services', servicesRouter);
app.use('/api/contact', contactRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  res.status(err.status || 500);
  res.json({ message: err.message });
});

module.exports = app;
