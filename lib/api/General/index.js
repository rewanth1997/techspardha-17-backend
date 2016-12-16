/**
 *  Some common endpoints like categories, societies
 *  etc can be fetched without token
 */
 /**
  * This file listens for all routes of coordinators
  *    - List Event
  *    - Update Event
  *    - Send participants to next round
  */

var express = require('express');
var router = express.Router();
var models = require('../../../models');
var Response = require('../../Response');
var statusCodes = require('../../statusCodes');
var tokenService = require('../../services/tokenService');
var adminMiddleware = require('../../../middlewares/adminMiddleware');


router.get('/categories', function(req, res) {
  var r = new Response();

  models.Category.findAll({

  }).then(function(data) {
    r.status = statusCodes.SUCCESS;
    r.data = data;
    res.json(r);
  });
});

router.get('/societies', function(req, res) {
  var r = new Response();

  models.Society.findAll({

  }).then(function(data) {
    r.status = statusCodes.SUCCESS;
    r.data = data;
    res.json(r);
  });
});


module.exports = router;
