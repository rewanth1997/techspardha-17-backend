var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');

var index = require('./routes/index');
var adminMiddleware = require('./middlewares/adminMiddleware');
var app = express();
var tokenMiddleware = require('./middlewares/tokenSecurity');

/* For Debugging */
//var tokenService = require('./lib/services/tokenService');            // Just for debug token
//console.log(tokenService.generateToken({email: 'test@gmail.com', id: 1}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS support 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/',tokenMiddleware);
app.use('/api', index);

module.exports = app;
