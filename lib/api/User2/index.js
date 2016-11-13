var express = require('express');
var app = express();
var router = express.Router();

var createTeam = require('./Team/create');
var deleteTeam = require('./Team/delete');

router.use('/create', createTeam);
router.use('/delete', deleteTeam);

module.exports = router;