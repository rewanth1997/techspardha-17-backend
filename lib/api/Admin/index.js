/**
 * This file listens for all routes of coordinators
 *    - List Event
 *    - Update Event
 *    - Send participants to next round
 */

var express = require('express');
var multer = require('multer');
var path = require('path');
var router = express.Router();
var models = require('../../../models');
var Response = require('../../Response');
var statusCodes = require('../../statusCodes');
var tokenService = require('../../services/tokenService');
var adminMiddleware = require('../../../middlewares/adminMiddleware');


/**
 * Login function
 * @constructor
 * @param {String} username
 * @param {String} password
 * @return {String} Token
 */

router.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var r = new Response();

  if(!username || !password) {
    r.status = statusCodes.BAD_INPUT;
    r.data = {error: "Username and password are required"};
    res.json(r);

    return ;
  }

  models.Coordinators.findAll({
    attributes: ['Id', 'Name', 'Email'],
    where: {
      Username: username,
      Password: password
    }
  }).then(function(data) {
    if(data.length === 1) {
      var token = tokenService.generateToken(data[0].dataValues);
      r.status = statusCodes.SUCCESS;
      r.data = data[0].dataValues;
      r.data.token = token;
    }
    else {
      r.status = statusCodes.INVALID_CREDENTIALS;
    }
    res.json(r);

  }).catch(function(error) {
    r.status = statusCodes.SERVER_ERROR;
    r.data = error;
    res.json(r);

  });
});

router.get('/events', adminMiddleware, function(req, res) {
  var r = new Response();
  models.CoordinatorEvents.findAll({
    where: {
      CoordinatorId: req.user.id,
      EventId: {
        $ne: null
      }
    },
    attributes: ['EventId']
  }).then(function(data) {
    var arr = [];
    data.forEach(function(elems) {
      arr.push(elems.dataValues.EventId);
    });
    r.status = statusCodes.SUCCESS;
    r.data = arr;
    res.json(r);
  }).catch(function(err) {
    r.status = statusCodes.SERVER_ERROR;
    res.json(r);
  });
});


var upload = multer({
  dest: './uploads/',
  limits: {
      fileSize: 1024 * 1024 * 20
  },
  storage : multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      var ext = path.extname(file.originalname);
      cb(null, Math.random().toString(36).substring(7) + ext);
    }
  }),
  fileFilter: function(req, file, cb) {
    if(file.mimetype == 'application/pdf')
      cb(null, true);
    else
      cb(null, false);
  }
});

router.post('/upload', adminMiddleware, upload.any(), function(req, res) {
  res.json(req.files.map(function(file) {
    var ext = path.extname(file.originalname);
    return {
      originalName: file.originalname,
      filename: file.filename
    };
  }));
});

module.exports = router;
