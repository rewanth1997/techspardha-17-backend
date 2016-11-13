var express = require('express');
var router = express.Router();
var Model = require('../../../../models');
// var Response = require('../../Response');                             //To be uncommented
// var statusCodes = require('../../statusCodes');
// var tokenService = require('../../services/tokenService');

router.post('/', function(req, res, next){

  // var r = new Response();                                          //To be uncommented
  // if(req.user === undefined) {
  //   r.status = statusCodes.INVALID_TOKEN;
  //   return res.end(r.toString());
  // }
  // var userId = req.user.id;
  var userId = 1;   // To be deleted after merge
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
          console.log(JSON.stringify(participant));       //To be send afterwards
          console.log(JSON.stringify(leader));            //To be send afterwards
          res.end("aasd");
      }).catch(function(err){
          console.log(err);
          res.end("aasd");
      });
    }).catch(function(err){
        console.log(err);
        res.end("aasd");
    });
  });

});

module.exports = router;
