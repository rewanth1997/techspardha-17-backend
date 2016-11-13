var express = require('express');
var app = express();
var router = express.Router();

var createTeam = require('./create');
var deleteTeam = require('./delete');
var getTeams = require('./getTeams');
var userTeams = require('./userTeams');

router.use('/', createTeam);
//router.use('/getTeams', getTeams);
router.use('/me', userTeams);

module.exports = router;