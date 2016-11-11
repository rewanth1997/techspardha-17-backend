var express = require('express');
var router = express.Router();

var adminRouter = require('../lib/api/Admin/Admin');
var eventsRouter = require('../lib/api/Events/Events');
var userRouter = require('../lib/api/User/User');

router.use('/admin', adminRouter);
router.use('/events', eventsRouter);
router.use('/user', userRouter);

module.exports = router;
