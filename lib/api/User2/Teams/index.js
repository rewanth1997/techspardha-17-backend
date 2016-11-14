var express = require('express');
var app = express();
var router = express.Router();

var teamCrud = require('./teamCrud');
var getTeams = require('./getTeams');
var userTeams = require('./userTeams');

router.use('/', teamCrud);
router.use('/getTeams', getTeams);
router.use('/me', userTeams);

module.exports = router;
