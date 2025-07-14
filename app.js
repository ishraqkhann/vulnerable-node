const express = require('express');
const session = require('express-session')
const engine = require('ejs-locals');
const path = require('path');
const favicon = require('serve-favicon');
const fs = require("fs");
const logger = require('morgan');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const log4js = require("log4js");
const cookieParser = require('cookie-parser');
const init_db = require('./model/init_db');
const log4js = require("log4js");
const products = require('./routes/products');
const init_db = require('./model/init_db');
const login = require('./routes/login');
const products = require('./routes/products');
var init_db = require('./model/init_db');
var login = require('./routes/login');
var products = require('./routes/products');
log4js.addAppender(log4js.appenders.file('app-custom.log'), 'vnode');
var app = express();

logger4js.setLevel('INFO');
log4js.loadAppender('file');
//log4js.addAppender(log4js.appenders.console());
log4js.addAppender(log4js.appenders.file('app-custom.log'), 'vnode');

var logger4js = log4js.getLogger('vnode');
logger4js.setLevel('INFO');

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'))

/*
 * Template engine
 */
app.engine('ejs', engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(logger('combined', {stream: accessLogStream}));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'ñasddfilhpaf78h78032h780g780fg780asg780dsbovncubuyvqy',
  cookie: {
    secure: false,
    maxAge: 99999999999
  }
}));

/*
 * Routes config
 */
  const err = new Error('Not Found');
app.use('', login);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*
 * Debug functions and error handlers
 */
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/*
 * Create database
 */
logger4js.info("Building database")
// logger.info(("Building database");

init_db();

module.exports = app;
