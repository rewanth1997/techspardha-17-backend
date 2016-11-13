var express = require('express');
var router = express.Router();
var Teams = require('../../../../models/teams');
var Model = require('../../../../models');
// var Response = require('../../Response');                     //Uncomment
// var statusCodes = require('../../statusCodes');

router.post('/', function(req, res, next){

  // if(req.user === undefined) {                                //Uncomment
  //   r.status = statusCodes.INVALID_TOKEN;
  //   return res.end(r.toString());
  // }

  //var teamLeaderId = req.user.id;                             //To be uncommented
  var teamLeaderId = 1;                                         //To be deleted
  var teamName = req.body.teamName;
  var eventId = req.body.eventId;
  // Inserting data into Teams table by creating a new table.
  Model.Teams.create({
       Name: teamName,
       EventId: eventId,
       TeamLeaderId: teamLeaderId
  }).then(function(data) {
    console.log("++++++++++++++++++++++++++++++++++++++++++++");               //To be changed
    console.log("Data Successfully Inserted into Teams table");
    console.log("++++++++++++++++++++++++++++++++++++++++++++");
  }).catch(function(err) {
    console.log('----------------------------------Error--------------------------------------------------');  //To be changed
    console.log(err);
  });

 });

router.delete('/:teamId', function(req, res, next) {

  // if(req.user === undefined) {                                      //Uncomment
  //   r.status = statusCodes.INVALID_TOKEN;
  //   return res.end(r.toString());
  // }

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
        console.log(JSON.stringify(data));
      }).catch(function(err) {
        console.log(err);
      });
    }
    else {
      res.send("Invalid team id");
    }
  }).catch(function(err){
    console.log('----------------------------------Error--------------------------------------------------');
    console.log(err);
  });

});

module.exports = router;
