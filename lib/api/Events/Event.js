var express = require('express');
var router = express.Router();
var Model = require('../../../models');
var Response = require('../../Response');
var statusCodes = require('../../statusCodes');
var tokenService = require('../../services/tokenService');

router.post('/:id/register', function(req, res) {
  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.json(r);
  }
  var eventId = req.params.id;
  var userId = req.user.id;
  Model.EventRegister.create({ Id: userId, EventId: eventId, CurrentRound: 0 })
  .then(function(data) {
    console.log("Record Inserted");
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
  if(req.user === undefined ) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.json(r);
  }
  var eventId = req.params.id;
  var userId = req.user.id;
  Model.EventRegister.destroy({where: {Id: userId, EventId : eventId}}).then( function(err,data) {
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

module.exports = router;
