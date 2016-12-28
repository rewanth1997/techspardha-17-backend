var express = require('express');
var router = express.Router();
var Model = require('../../../models');
var Response = require('../../Response');
var statusCodes = require('../../statusCodes');
var tokenService = require('../../services/tokenService');
var adminMiddleware = require('../../../middlewares/adminMiddleware');
var moveToNextRound = require('./MoveToNextRound');
var moveBack = require('./MoveBack');
var participants = require('./Participants');
var notifications = require('./Notifications');

router.use('/:id/participants', participants);
router.use('/:id/forward', moveToNextRound);
router.use('/:id/backward', moveBack);
router.use('/:id/notify', notifications);

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
    },
    include: [{
      model: Model.Coordinators,
      exclude: [{
        model: Model.CoordinatorEvents,
      }],
      attributes:['Name', 'PhoneNo', 'Email']
    }],
  }).then(function(data) {
    for(var j = 0; j < data.dataValues.Coordinators.length;j++) {
        delete data.dataValues.Coordinators[j].dataValues.CoordinatorEvents;
    }

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

  if(req.body.Start) {
    var start = new Date(req.body.Start);
    if(isNaN(start.getTime())) {
      r.status = statusCodes.BAD_INPUT;
      r.data = "Invalid start date";
      return res.json(r);
    }
  }
  if(req.body.End) {
    var end = new Date(req.body.End);
    if(isNaN(end.getTime())) {
      r.status = statusCodes.BAD_INPUT;
      r.data = "Invalid start date";
      return res.json(r);
    }
  }

  Model.CoordinatorEvents.find({
    where: {
      CoordinatorId: req.user.id,
      EventId: eventId
    }
  })
  .then(function(data) {
    if(data) {
      Model.Events.update(req.body, {
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
