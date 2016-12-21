var express = require('express');
var app = express();
var router = express.Router();

var adminRouter = require('../lib/api/Admin');
var eventsRouter = require('../lib/api/Events/Events');
var eventRouter = require('../lib/api/Events/Event');
var userRouter = require('../lib/api/User/User');
var teamsRouter = require('../lib/api/User2/Teams/index');
var teamRouter = require('../lib/api/User2/Team/index');
var guestLectureRouter = require('../lib/api/GuestLecture/GuestLecture');
var wishListRouter = require('../lib/api/GuestLecture/WishList');
var generalRouter = require('../lib/api/General');

router.use('/admin', adminRouter);
router.use('/events', eventsRouter);
router.use('/event',eventRouter);
router.use('/user', userRouter);
router.use('/teams', teamsRouter);
router.use('/team', teamRouter);
router.use('/guestLectures', guestLectureRouter);
router.use('/wishlist', wishListRouter);
router.use('/', generalRouter);

module.exports = router;
