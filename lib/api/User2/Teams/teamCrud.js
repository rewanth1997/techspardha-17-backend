var express = require('express');
var router = express.Router();
var Teams = require('../../../../models/teams');
var Model = require('../../../../models');
var Response = require('../../../Response');
var statusCodes = require('../../../statusCodes');
var tokenService = require('../../../services/tokenService');

router.post('/', function(req, res, next){

  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.json(r);
  }
  var teamLeaderId = req.user.id;
  var teamName = req.body.teamName;
  var eventId = req.body.eventId;
  // Inserting data into Teams table by creating a new table.
  Model.Teams.create({
    Name: teamName,
    EventId: eventId,
    TeamLeaderId: teamLeaderId,
    CurrentRound: 0
  }).then(function(data) {
    r.status = statusCodes.SUCCESS;
    r.data = "Team created Successfully";
    res.json(r);
  }).catch(function(err) {
    r.status = statusCodes.SERVER_ERROR;
    r.data = err;
    res.json(r);
  });

});
module.exports = router;
