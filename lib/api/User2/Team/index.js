var express = require('express');
var app = express();
var router = express.Router();

var invite = require('./invite');
var userTeams = require('./userTeams');

router.use('/:id/invite', invite);

module.exports = router;