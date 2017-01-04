var express = require('express');
var router = express.Router();

var invite = require('./invite');
router.use('/', invite);

module.exports = router;
