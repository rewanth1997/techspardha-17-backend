var express = require('express');
var app = express();
var router = express.Router();

var teamCrud = require('./teamCrud');
var getRegisteredTeams = require('./getRegisteredTeams');
var userTeams = require('./userTeams');

router.use('/', teamCrud);
router.use('/getRegisteredTeams', getRegisteredTeams);
router.use('/me', userTeams);

module.exports = router;
