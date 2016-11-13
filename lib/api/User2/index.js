var express = require('express');
var app = express();
var router = express.Router();

var createTeam = require('./Team/create');

router.use('/create', createTeam);

module.exports = router;