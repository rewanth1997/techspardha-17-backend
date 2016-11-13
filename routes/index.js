var express = require('express');
var app = express();
var router = express.Router();

var adminRouter = require('../lib/api/Admin/Admin');
var eventsRouter = require('../lib/api/Events/Events');
var userRouter = require('../lib/api/User/User');
var teamsRouter = require('../lib/api/User2/Teams/index');
var teamRouter = require('../lib/api/User2/Team/index');

router.use('/admin', adminRouter);
router.use('/events', eventsRouter);
router.use('/user', userRouter);
router.use('/teams', teamsRouter);
router.use('/team', teamRouter);
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
