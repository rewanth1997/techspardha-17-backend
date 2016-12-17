var express = require('express');
var router = express.Router();
var Model = require('../../../models');
var Response = require('../../Response');
var statusCodes = require('../../statusCodes');
var tokenService = require('../../services/tokenService');
var adminMiddleware = require('../../../middlewares/adminMiddleware');
var moveToNextRound = require('./MoveToNextRound');
var participants = require('./Participants');

router.use('/:id/participants', participants);
router.use('/:id/forward', moveToNextRound);

router.post('/:id/register', function(req, res) {
  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.json(r);
  }
  var eventId = parseInt(req.params.id);
  var userId = parseInt(req.user.id);

  // TODO: Prevent duplicate event registers by making
  // (EventId, StudentId) and (EventId, TeamId) UNIQUE

  Model.EventRegister.create({
    StudentId: userId,
    EventId: eventId,
    CurrentRound: 0
  }).then(function(data) {
    console.log("User registered for event");
    r.status = statusCodes.SUCCESS;
    return res.json(r);
  })
  .catch(function(err) {
    r.status = statusCodes.SERVER_ERROR;
    r.data = err;
    return res.json(r);
  });
});

router.delete('/:id/register', function(req, res) {
  var r = new Response();

  var eventId = req.params.id;
  var userId = req.user.id;
  Model.EventRegister.destroy({
    where: {
      Id: userId,
      EventId : eventId
    }
  }).then(function(err,data) {
      if(err) {
        console.log(err);
        r.status = statusCodes.SERVER_ERROR;
        r.data = err;
        return res.json(r);
      }
      else {
        console.log(data);
        r.status = statusCodes.SUCCESS;
        return res.json(r);
      }
    });
});


router.delete('/:id', adminMiddleware, function(req, res) {
  var r = new Response();
  var eventId = parseInt(req.params.id);
  Model.CoordinatorEvents.find({
    EventId: eventId,
    CoordinatorId: req.user.id
//    attributes: ['CoordinatorId']
  }).then(function(data) {
    if(data.length === 0) {
      r.status = statusCodes.NOT_AUTHORIZED;
      return res.json(r);
    }

    Model.Events.destroy({
      where : {
        Id: eventId
      }
    }).then(function(data, err) {
      console.log("error: " + err);
      console.log("data: " + data);
      if(err) {
        r.status = statusCodes.SERVER_ERROR;
      }
      else {
        r.status = statusCodes.SUCCESS;
        r.data = "Successfully deleted";
      }
      return res.json(r);

    });

  }).catch(function(e) {
    r.status = statusCodes.SERVER_ERROR;
    r.data = e;
    res.json(r);
    console.error(e.stack);
  });
});


router.get('/:id', function(req, res) {
  var r = new Response();
  var eventId = parseInt(req.params.id);
  if(!eventId) {
    r.status = statusCodes.BAD_INPUT;
    r.data = "Integer ID of event required";
    return res.json(r);
  }
  Model.Events.find({
    where: {
      Id: eventId
    }
  }).then(function(data) {
    r.status = statusCodes.SUCCESS;
    r.data = data;
    return res.json(r);
  }).catch(function(err) {
    r.status = statusCodes.SERVER_ERROR;
    return res.json(r);
  });
});


router.post('/:id', adminMiddleware, function(req, res) {
  var r = new Response();
  var eventId = parseInt(req.params.id);
  var toChange = {};
  if(req.body.name)
    toChange.Name = req.body.name;
  if(req.body.description)
    toChange.Description = req.body.description;
  if(req.body.venue)
    toChange.Venue = req.body.venue;

  if(req.body.start) {
    var start = new Date(req.body.start);
    if(!isNaN(start.getTime())) {
      toChange.Start = start;
    }
  }
  if(req.body.start) {
    var end = new Date(req.body.end);
    if(!isNaN(end.getTime())) {
      toChange.End = end;
    }
  }
  if(req.body.categoryId)
    toChange.CategoryId = req.body.categoryId;

  if(req.body.societyId)
    toChange.SocietyId = req.body.societyId;

  if(req.body.currentRound)
    toChange.CurrentRound = req.body.currentRound;
  if(req.body.maxContestants)
    toChange.MaxContestants = req.body.maxContestants;
  if(req.body.status)
    toChange.Status = req.body.status;
  if(req.body.pdf)
    toChange.pdf = req.body.pdf;

  if(Object.keys(toChange).length === 0) {
    r.status = statusCodes.BAD_INPUT;
    r.data = "Atleast one field information is required to update";
    return res.json(r);
  }

  Model.CoordinatorEvents.find({
    where: {
      CoordinatorId: req.user.id,
      EventId: eventId
    }
  })
  .then(function(data) {
    if(data) {
      Model.Events.update(toChange, {
        where: {
          Id: eventId
        }
      }).then(function(response) {
        r.status = statusCodes.SUCCESS;
        r.data = 'Event updated successfully';
        res.json(r);
      });
    }
    else {
      r.status = statusCodes.NOT_AUTHORIZED;
      res.json(r);
    }
  })
  .catch(function(e) {
    console.error(e.stack);
    r.status = statusCodes.SERVER_ERROR;
    r.data = e;
    res.json(r);
  });
});

module.exports = router;
