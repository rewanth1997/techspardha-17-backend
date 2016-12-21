/*
* This file consists of GuestLecture routers
* Routes here are
*   - Get all the guest lectures ( No authentication required )
*/

var express = require('express');
var router = express.Router();
var models = require('../../../models');
var Model = require('../../../models/index');
var Response = require('../../Response');
var statusCodes = require('../../statusCodes');
var tokenService = require('../../services/tokenService');
var adminMiddleware = require('../../../middlewares/adminMiddleware');

//Creating a guest lecture
router.post('/create', function(req, res, next) {
  var startTime = req.body.start;
  var endTime = req.body.end;
  var photo = req.body.photo;
  var description = req.body.description;
  var guestName = req.body.name;
  var venue = req.body.venue;

  // Checking for duplicate entries
  models.GuestLectures.findAll({
    where: {
      Start: startTime,
      End: endTime,
      GuestName: guestName,
      Venue: venue      
    }
  }).then(function(data) {
    if(data.length >= 1) {
      r.status = statusCodes.BAD_INPUT;
      r.data = "Guest Lecture already registered";
      res.json(r);
    }
    else {
      models.GuestLectures.create({
        Start: startTime,
        End: endTime,
        Photo: photo,
        Description: description,
        GuestName: guestName,
        Venue: venue
      }).then(function(data) {
        r.status = statusCodes.SUCCESS;
        r.data = "GuestLecture successfully created";
        res.json(r);
      }).catch(function(err) {
        r.status = statusCodes.SERVER_ERROR;
        r.data = err;
        res.end(r.toString());
      });
    }
  });

});


//Fetching all the events
router.get('/', function(req, res) {

  models.GuestLectures.findAll({
    
  }).then(function(data) {
    r.status = statusCodes.SUCCESS;
    r.data = data;
    res.json(r);
  }).catch(function(err) {
    r.status = statusCodes.SERVER_ERROR;
    r.data = err;
    res.end(r.toString());
  });
});

//Fething a single event
router.get('/:id', function(req, res) {

  var guestLectureId = req.params.id;

  models.GuestLectures.find({
    where: {
      Id: guestLectureId
    }
  }).then(function(data) {
    r.status = statusCodes.SUCCESS;
    r.data = data;
    res.json(r);
  }).catch(function(err) {
    r.status = statusCodes.SERVER_ERROR;
    r.data = err;
    res.end(r.toString());
  });

});

module.exports = router;