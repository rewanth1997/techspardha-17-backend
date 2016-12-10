var express = require('express');
var router = express.Router({mergeParams: true});
var Model = require('../../../models');
var Response = require('../../Response');
var statusCodes = require('../../statusCodes');
var tokenService = require('../../services/tokenService');
var adminMiddleware = require('../../../middlewares/adminMiddleware');

router.post('/', adminMiddleware, function(req, res) {
  var r = new Response();
  var eventId = parseInt(req.params.id);
  if(!eventId) {
    r.status = statusCodes.BAD_INPUT;
    r.data = "Integer ID of event required";
    return res.json(r);
  }
  if(!req.body.data) {
    r.status = statusCodes.BAD_INPUT;
    r.data = "Request body is empty";
    return res.json(r);
  }

  Model.CoordinatorEvents.findAll({
    where: {
      EventId: eventId
    }
  }).then(function(data) {
    data.forEach(function(coordinatorEvent) {
      if(coordinatorEvent.CoordinatorId === req.user.id) {
        var participants = req.body.data;
        if(typeof participants === 'string')
          participants = JSON.parse(participants);

        Model.EventRegister.update( {
          CurrentRound : 1
        }, {
          where: {
            EventId: eventId,
            $or: {
              StudentId: participants,
              TeamId: participants
            }
          }
        }).then(function(response) {
          r.status = statusCodes.SUCCESS;
          res.json(r);
        });
      }
    });
  }).catch(function(err) {
    console.error(err.stack);
    r.status = statusCodes.SERVER_ERROR;
    return res.json(r);
  });
});

module.exports = router;
