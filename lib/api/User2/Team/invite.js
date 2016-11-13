var express = require('express');
var router = express.Router();
var Model = require('../../../../models');
var SendInvites = require('../../../../models/teamInvites');


router.post('/', function(req, res, next){
  /*
  * authentication check api must be 
  * called from here
  * Check whether the token is valid or not
  */

  /*
  * decodes the token by calling
  * the verification code
  * var tokenDetails = [userId, emailId]
  */
  tokenDetails = [10,15];
  var teamLeaderId = tokenDetails[0];
  var emailId = tokenDetails[1];
  /*
    POST request contains action (req.body.action):
    - NEW
    - ACCEPT
    - DECLINE
  */
  var teamId = req.query.teamId;
  var action = req.query.action;

  switch(action) {
    case 'new':
      var invites = req.query.invites;
      members = JSON.parse(invites);
      
      members.forEach(function(memberId) {
        Model.TeamInvites.create({
          TeamId: parseInt(teamId),
          StudentId: parseInt(memberId),
          Status: false
        }).then(function(data) {
          console.log("Data updated successfully into teamInvites table");
        }).catch(function(err) {
          console.log(err);
        });
      });
      break;

    case 'accept':
      var studentId = teamLeaderId;
      Model.TeamInvites.update({
        Status: true
      },{
        //TeamId=teamid AND StudentId=studentID
        where: {
          $and: [{TeamId:teamId},{StudentId:studentId}]
        }
      })
  }


});

module.exports = router;