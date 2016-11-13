var express = require('express');
var router = express.Router();
var models = require('../../../models');

router.get('/', function(req, res) {
  res.type('text/json');
  res.end('{"status": { "code": 200, "message": "SUCCESS"}}');
});

module.exports = router;
