var express = require('express');
var router = express.Router();
var Model = require('../../../../models');
var SendInvites = require('../../../../models/teamInvites');
var Response = require('../../../Response');
var statusCodes = require('../../../statusCodes');
var tokenService = require('../../../services/tokenService');

router.post('/:teamId/invite', function(req, res, next){

  var r = new Response();
  
  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.json(r);
  }

  var teamLeaderId = req.user.id;
  var teamId = req.params.teamId;
  var inviteType = req.body.inviteType;

  switch(inviteType) {
    case 'new':

      var invites = req.body.invites;
      console.log(invites);
      members = JSON.parse(invites);
      console.log(members);

      members.forEach(function(memberId) {
        Model.TeamInvites.create({
          TeamId: parseInt(teamId),
          StudentId: parseInt(memberId),
          Status: 'Pending'
        }).then(function(data) {
          console.log("Data updated successfully into teamInvites table");
        }).catch(function(err) {
          r.status = statusCodes.SERVER_ERROR;
          r.data = err;
          res.json(r);
        });
      });
      r.status = statusCodes.SUCCESS;
      r.data = 'Sent Invite To All Members';
      res.json(r);
      break;

    case 'accept':

      var studentId = teamLeaderId;
      Model.TeamInvites.update({
        Status: 'Accepted'
      },{
        where: ['TeamId = ? AND StudentId = ?',teamId,studentId]
      }).then(function(data) {
        console.log("successfully updated");
        r.status = statusCodes.SUCCESS;
        r.data = 'Invite Accepted Successfully';
        res.json(r);
      }).catch(function(err) {
        r.status = statusCodes.SERVER_ERROR;
        r.data = err;
        res.json(r);
      });
      break;

    case 'decline':

      studentId = teamLeaderId;
      Model.TeamInvites.update({
        Status: 'Declined'
      },{
        where: ['TeamId = ? AND StudentId = ?',teamId,studentId]
      }).then(function(data) {
        console.log("successfully updated");
        r.status = statusCodes.SUCCESS;
        r.data = 'Invite Declined Successfully';
        res.json(r);
      }).catch(function(err) {
        r.status = statusCodes.SERVER_ERROR;
        r.data = err;
        res.json(r);
      });
      break;
  }

});

router.post('/:teamId', function(req, res, next) {
  var r = new Response();
  
  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.json(r);
  }
  
  var teamLeaderId = req.user.id;
  var teamId = req.params.teamId;

  Model.TeamInvites.findAll({
    where: {
      TeamId: teamId
    },
    include: [{model: Model.Teams, attributes:['Name']}, 
              {model: Model.Students, as: 'Student', attributes:['Name']}]
    
  }).then(function(data) {
    r.status = statusCodes.SUCCESS;
    r.status.message = 'Successfully fetched the team Users';
    r.data = data;
    res.json(r);
  });

});

module.exports = router;
