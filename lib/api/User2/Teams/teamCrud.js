var express = require('express');
var router = express.Router();
var Teams = require('../../../../models/teams');
var Model = require('../../../../models');
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
      attributes: ['EventId','Name'],
      where: ['TeamLeaderId = ?',userId]
    }).then(function(leader){
      Model.TeamInvites.findAll({
        attributes: [],
        where: ['TeamLeaderId = ? and Status = ?',userId,1],
        include: [{model: Model.Teams, attributes:['EventId','Name']}]
      }).then(function(participant){
        Model.TeamInvites.findAll({
          attributes: [],
          where: ['TeamLeaderId = ? and Status = ?',userId,0],
          include: [{model: Model.Teams, attributes:['EventId','Name']}]
        }).then(function(pending){
          r.status = statusCodes.SUCCESS;
          r.data = [{'participantIn' : participant},{'teamLeaderOf' : leader},{'pendingInvitations' : pending}];
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
      res.end(r.toString());
  });

 });

router.delete('/:teamId', function(req, res, next) {

  var r = new Response();

  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.end(r.toString());
  }

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
          TeamLeaderId: teamLeaerId
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
