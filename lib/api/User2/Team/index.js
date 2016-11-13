var express = require('express');
var app = express();
var router = express.Router();

var invite = require('./invite');

router.use('/:id/invite', invite);

module.exports = router;