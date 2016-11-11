/**
 * This file listens for all routes of coordinators
 *    - List Event
 *    - Update Event
 *    - Send participants to next round
 */

var express = require('express');
var router = express.Router();
var models = require('../../../models');

router.get('/', function(req, res) {
  res.type('text/json');
  res.end('{"status": { "code": 200, "message": "SUCCESS"}}');
});

module.exports = router;
