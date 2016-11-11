var express = require('express');
var app = express();
var router = express.Router();

/**
 * Intentionally left stuff here.
 *
 * Only contains information about route and
 * the module which handles that route, NO
 * actual code to be written here
 *
 *
 */

var events = require('./../lib/api/Events/Events');

router.use('/api/events',events);

module.exports = router;
