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

router.get('/', function(req, res) {
  var r = new Response();

  models.GuestLectures.findAll({
    
  }).then(function(data) {
    r.status = statusCodes.SUCCESS;
    r.data = data;
    res.json(r);
  })
});

module.exports = router;
