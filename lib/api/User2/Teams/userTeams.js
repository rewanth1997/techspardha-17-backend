var express = require('express');
var router = express.Router();
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
  var userId = req.user.id;
  Model.Teams.findAll({
    attributes: ['EventId'],
    where: ['TeamLeaderId = ?',userId]
  }).then(function(leader){
    Model.Teams.findAll({
      attributes: ['EventId','Name'],
      where: ['TeamLeaderId = ?',userId]
    }).then(function(leader){
      Model.TeamInvites.findAll({
        attributes: [],
        where: ['TeamLeaderId = ? and Status = ?',userId,1],
        include: [{model: Model.Teams,
                   attributes:['EventId','Name']}]
      }).then(function(participant){
          r.status = statusCodes.SUCCESS;
          r.data = [{'participatedIn' : participant},{'teamLeaderOf' : leader}];
          res.end(r.toString());
      }).catch(function(err){
          console.log(err);
          r.status = statusCodes.SERVER_ERROR;
          r.data = err;
          res.end(r.toString());
      });
    }).catch(function(err){
        console.log(err);
        r.status = statusCodes.SERVER_ERROR;
        r.data = err;
        res.end(r.toString());
    });
  });

});

module.exports = router;
