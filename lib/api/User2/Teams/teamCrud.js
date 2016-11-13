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
    return res.end(r.toString());
  }
  var teamLeaderId = req.user.id;
  var teamName = req.body.teamName;
  var eventId = req.body.eventId;
  // Inserting data into Teams table by creating a new table.
  Model.Teams.create({
       Name: teamName,
       EventId: eventId,
       TeamLeaderId: teamLeaderId
  }).then(function(data) {
      r.status = statusCodes.SUCCESS;
      r.data = "Team created Successfully";
      res.end(r.toString());
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
    attributes: ['id'],
    where: {
      id: teamId
    }
  }).then(function(data){
    if(data.length >= 1) {
      Model.Teams.destroy({
        where: {
          id: teamId
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
    res.end(r.toString());
  });

});

module.exports = router;
