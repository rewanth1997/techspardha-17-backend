var express = require('express');
var router = express.Router();
var Teams = require('../../../../models/teams');
var Model = require('../../../../models');
var CONSTANTS = require('../../../constants');
var Response = require('../../../Response');
var statusCodes = require('../../../statusCodes');
var tokenService = require('../../../services/tokenService');

router.get('/', function(req, res, next) {

  var r = new Response();

  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.json(r);
  }
  var userId = req.user.id;

  Model.Teams.findAll({
    attributes: ['EventId'],
    where: {
      TeamLeaderId: userId
    }
  }).then(function(leader){
    Model.Teams.findAll({
      attributes: ['EventId','Name', 'Id'],
      where: ['TeamLeaderId = ?',userId]
    }).then(function(leader){
      Model.TeamInvites.findAll({
        attributes: [],
        where: ['StudentId = ? and Status = ?',userId, CONSTANTS.TEAM.ACCEPTED],
        include: [{model: Model.Teams, attributes:['EventId','Name', 'Id']}]
      }).then(function(participant){
        Model.TeamInvites.findAll({
          attributes: [],
          where: ['StudentId = ? and Status = ?',userId, CONSTANTS.TEAM.PENDING],
          include: [{model: Model.Teams, attributes:['EventId','Name', 'Id']}]
        }).then(function(pending){
          r.status = statusCodes.SUCCESS;
          r.data = {
            'participantIn' : participant.map(function(info) { return info.Team; }),
            'teamLeaderOf' : leader,
            'pendingInvitations' : pending.map(function(info) { return info.Team; })
          };
          res.json(r);
        }).catch(function(err){
            console.log(err);
            r.status = statusCodes.SERVER_ERROR;
            r.data = err;
            res.json(r);
        });
      }).catch(function(err){
          console.log(err);
          r.status = statusCodes.SERVER_ERROR;
          r.data = err;
          res.json(r);
      });
    });
  });
});


router.post('/', function(req, res, next){

  var r = new Response();

  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.json(r);
  }
  var teamLeaderId = req.user.id;
  var teamName = req.body.teamName;
  var eventId = req.body.eventId;

  Model.Teams.findAll({
    where: {
      Name: teamName,
      EventId: eventId
    }
  }).then(function(data) {
    if(data.length >= 1) {
      r.status = statusCodes.BAD_INPUT;
      r.data = "A team with same name already registered for this event";
      res.end(r.toString());
    }
    else {
      // Inserting data into Teams table by creating a new table.
      Model.Teams.create({
        Name: teamName,
        EventId: eventId,
        TeamLeaderId: teamLeaderId,
        CurrentRound: 0
      }).then(function(data) {
        r.status = statusCodes.SUCCESS;
        r.data = {
          Id: data.Id,
          message: "Team created successfully"
        };
        res.json(r);
      }).catch(function(err) {
          r.status = statusCodes.SERVER_ERROR;
          r.data = err;
          res.end(r.toString());
      });
    }
  });


 });

router.delete('/:teamId', function(req, res, next) {

  var r = new Response();

  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.end(r.toString());
  }

  var teamLeaderId = req.user.id;
  var teamId = req.params.teamId;

  Model.Teams.findAll({
    attributes: ['Id'],
    where: {
      Id: teamId,
      TeamLeaderId: teamLeaderId
    }
  }).then(function(data){
    if(data.length >= 1) {
      Model.Teams.destroy({
        where: {
          Id: teamId,
          TeamLeaderId: teamLeaderId
        }
      }).then(function(data) {
          r.status = statusCodes.SUCCESS;
          r.data = "Team deleted successfully";
          res.end(r.toString());
      }).catch(function(err) {
        r.status = statusCodes.SERVER_ERROR;
        r.data = err;
        res.end(r.toString());
      });
    }
    else {
      r.status = statusCodes.SERVER_ERROR;
      r.data = "Invalid Team Id";
      res.end(r.toString());
    }
  }).catch(function(err){
    r.status = statusCodes.SERVER_ERROR;
    r.data = err;
    res.json(r);
  });

});
module.exports = router;
