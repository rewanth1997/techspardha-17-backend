var express = require('express');
var app = express();
var router = express.Router();

var teamCrud = require('./teamCrud');
var getRegisteredTeams = require('./getRegisteredTeams');

router.use('/', teamCrud);
router.use('/getRegisteredTeams', getRegisteredTeams);

module.exports = router;
