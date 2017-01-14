var express = require('express');
var router = express.Router({mergeParams: true});
var Model = require('../../../models');
var Response = require('../../Response');
var CONSTANTS = require('../../constants');
var statusCodes = require('../../statusCodes');
var tokenService = require('../../services/tokenService');
var adminMiddleware = require('../../../middlewares/adminMiddleware');

router.post('/', adminMiddleware, function(req, res) {
  var r = new Response();
  var eventId = parseInt(req.params.id);
  var notificationId;
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
  if(!req.body.message) {
    r.status = statusCodes.BAD_INPUT;
    r.data = "Notification message must be present";
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
          Model.Notifications.create({
            Message: req.body.message,
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
                if(candidate.TeamId) {
                  // All members of the team are to be notified
                  Model.TeamInvites.findAll({
                    where: {
                      Status: CONSTANTS.TEAM.ACCEPTED
                    },
                    include: [{
                      model: Model.Students,
                      as: 'Student',
                      attributes: ['Id']
                    }],
                    attributes: []
                  }).then(function(teamData) {
                    teamData.forEach((function(team) {
                      Model.UsersNotifications.create({
                        StudentId: team.Student.Id,
                        NotificationId: notificationId,
                        Status: 0
                      });
                    }));
                    r.status = statusCodes.SUCCESS;
                    r.data = "Invite successful";
                    res.json(r);
                  });
                }
                else {
                  // Individual event
                  Model.UsersNotifications.create({
                    StudentId: candidate.StudentId,
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
                }
              });
            });
          })
          .catch(function(err) {
            r.status = statusCodes.SERVER_ERROR;
            r.data = err;
            return res.json(r);
          });
      }
      else {
        r.status = statusCodes.NOT_AUTHORIZED;
        r.data = err;
        return res.json(r);
      }
    });
  }).catch(function(err) {
    console.error(err.stack);
    r.status = statusCodes.SERVER_ERROR;
    return res.json(r);
  });
});

router.post('/all', adminMiddleware, function(req, res) {
  var r = new Response();
  var eventId = parseInt(req.params.id);
  var notificationId;
  if(!eventId) {
    r.status = statusCodes.BAD_INPUT;
    r.data = "Integer ID of event required";
    return res.json(r);
  }
  console.log(req.body.message);
  if(!req.body.message) {
    r.status = statusCodes.BAD_INPUT;
    r.data = "Notification message must be present";
    return res.json(r);
  }
  Model.CoordinatorEvents.findAll({
    where: {
      EventId: eventId
    }
  }).then(function(data) {
    data.forEach(function(coordinatorEvent) {
      if(coordinatorEvent.CoordinatorId === req.user.id) {

          Model.Notifications.create({
            Message: req.body.message,
            EventId: eventId,
            NotificationType: 'private'
          }).then(function(data) {
            notificationId = parseInt(data.Id);
            console.log("Notification created for the event");
            Model.EventRegister.findAll({
              where: {
                EventId: eventId
            }
          }).then(function(candidates) {
              candidates.forEach(function(candidate) {
                if(candidate.TeamId) {
                  // All members of the team are to be notified
                  Model.TeamInvites.findAll({
                    where: {
                      Status: CONSTANTS.TEAM.ACCEPTED
                    },
                    include: [{
                      model: Model.Students,
                      as: 'Student',
                      attributes: ['Id']
                    }],
                    attributes: []
                  }).then(function(teamData) {
                    teamData.forEach((function(team) {
                      Model.UsersNotifications.create({
                        StudentId: team.Student.Id,
                        NotificationId: notificationId,
                        Status: 0
                      });
                    }));

                  });
                }
                else {
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
                }
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
      }
    });
  }).catch(function(err) {
    console.error(err.stack);
    r.status = statusCodes.SERVER_ERROR;
    return res.json(r);
  });
});

router.post('/global', adminMiddleware, function(req, res) {
  var r = new Response();
  var eventId = parseInt(req.params.id);

  if(!eventId) {
    r.status = statusCodes.BAD_INPUT;
    r.data = "Integer ID of event required";
    return res.json(r);
  }
  console.log(req.body.message);
  if(!req.body.message) {
    r.status = statusCodes.BAD_INPUT;
    r.data = "Notification message must be present";
    return res.json(r);
  }
  Model.CoordinatorEvents.findAll({
    where: {
      EventId: eventId
    }
  }).then(function(data) {
    data.forEach(function(coordinatorEvent) {
      if(coordinatorEvent.CoordinatorId === req.user.id) {

          Model.Notifications.create({
            Message: req.body.message,
            EventId: eventId,
            NotificationType: 'global'
          }).then(function(data) {
            r.status = statusCodes.SUCCESS;
            res.json(r);
            return res.json(r);
          })
          .catch(function(err) {
            r.status = statusCodes.SERVER_ERROR;
            r.data = err;
            return res.json(r);
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
