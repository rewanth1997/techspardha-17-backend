var express = require('express');
var router = express.Router({mergeParams: true});
var Model = require('../../../models');
var Response = require('../../Response');
var statusCodes = require('../../statusCodes');
var tokenService = require('../../services/tokenService');
var adminMiddleware = require('../../../middlewares/adminMiddleware');

router.get('/', adminMiddleware, function(req, res) {
  var r = new Response();
  var eventId = parseInt(req.params.id);
  if(!eventId) {
    r.status = statusCodes.BAD_INPUT;
    r.data = "Integer ID of event required";
    return res.json(r);
  }
  Model.CoordinatorEvents.findAll({
    where: {
      EventId: eventId
    }
  }).then(function(data) {
    // Event details in data
    data.forEach(function(coordinatorEvent) {
      console.log(req.user.id);
      if(coordinatorEvent.CoordinatorId === req.user.id) {
        Model.EventRegister.findAll( {
          include: [Model.Students, Model.Teams],
          where: {
            EventId: eventId
          },
          attributes: ['CurrentRound']
        }).then(function(data) {
          r.status = statusCodes.SUCCESS;
          if(typeof data.Team === undefined)
            data.Team = undefined;
          r.data = data;
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
