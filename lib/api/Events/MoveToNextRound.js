var express = require('express');
var router = express.Router({mergeParams: true});
var Model = require('../../../models');
var Response = require('../../Response');
var statusCodes = require('../../statusCodes');
var tokenService = require('../../services/tokenService');
var adminMiddleware = require('../../../middlewares/adminMiddleware');
var CONSTANTS = require('../../constants');

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

        Model.EventRegister.find({
          where: {
            EventId: eventId,
            $or: {
              StudentId: participants,
              TeamId: participants
            }
        }
        }).then(function(instance) {
          var message = CONSTANTS.NOTIFICATION_MESSAGE.NEXT_ROUND;
          console.log("Message : " + message);
          instance.increment('CurrentRound');
          Model.Notifications.create({
            Message: message,
            EventId: eventId,
            NotificationType: 'private'
          }).then(function(data) {
            notificationId = data.Id;
            console.log("Notification created for the event");
            Model.EventRegister.findAll({
              where: {
                EventId: eventId,
                $or: {
                  StudentId: participants,
                  TeamId: participants
                }
            }
          }).then(function(candidates) {
              candidates.forEach(function(candidate) {
                Model.UsersNotifications.create({
                  StudentId: candidate.StudentId || candidate.TeamId,
                  NotificationId: notificationId,
                  Status: 0
                }).then(function(data) {
                  console.log("User or Team notified for the event");
                })
                .catch(function(err) {
                  r.status = statusCodes.SERVER_ERROR;
                  r.data = err;
                  return res.json(r);
                });
              });
              r.status = statusCodes.SUCCESS;
              res.json(r);
            });
          })
          .catch(function(err) {
            r.status = statusCodes.SERVER_ERROR;
            r.data = err;
            return res.json(r);
          });
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
