/*
* This file consists of GuestLecture routers
* Routes here are
*   - Get all the guest lectures ( No authentication required )
*/

var express = require('express');
var router = express.Router();
var models = require('../../../models');
var Model = require('../../../models/index');
var Response = require('../../Response');
var statusCodes = require('../../statusCodes');
var tokenService = require('../../services/tokenService');
var adminMiddleware = require('../../../middlewares/adminMiddleware');

//Fetching all the events
router.get('/', function(req, res) {

  models.GuestLectures.findAll({
    
  }).then(function(data) {
    r.status = statusCodes.SUCCESS;
    r.data = data;
    res.json(r);
  }).catch(function(err) {
    r.status = statusCodes.SERVER_ERROR;
    r.data = err;
    res.end(r.toString());
  });
});