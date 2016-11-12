var express = require('express');
var app = express();
var router = express.Router();

var adminRouter = require('../lib/api/Admin/Admin');
var eventsRouter = require('../lib/api/Events/Events');
var userRouter = require('../lib/api/User/User');

router.use('/admin', adminRouter);
router.use('/events', eventsRouter);
router.use('/user', userRouter);
/**
 * Intentionally left stuff here.
 *
 * Only contains information about route and
 * the module which handles that route, NO
 * actual code to be written here
 *
 *
 */

module.exports = router;
