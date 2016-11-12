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

router.get('/', function(req, res) {
//  res.setHeader('Content-Type', 'application/json');
  models.Coordinator.findAll({
      attributes: {
        exclude: ['password']
      }
    })
    .then(function(coordinators) {
      var r = new Response();
      r.status = statusCodes.SUCCESS;
      r.data = coordinators;
      res.end(r.toString());
    });
});


module.exports = router;
