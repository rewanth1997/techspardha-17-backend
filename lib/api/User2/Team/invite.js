var express = require('express');
var router = express.Router();
var Model = require('../../../../models');
var SendInvites = require('../../../../models/teamInvites');
var CONSTANTS = require('../../../constants');
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
      members = JSON.parse(invites);

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

// Status of pending and accepted requests of a particular team.
router.post('/:teamId', function(req, res, next) {
  var r = new Response();

  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.json(r);
  }
  var teamLeaderId = req.user.id;
  var teamId = req.params.teamId;

  Model.Teams.find({
    where: {
      Id: teamId
    },
    attributes: {
      exclude: ['Id'],
    },
    include: [{
      model: Model.TeamInvites,
      where: {
        Status: {
          $in: [CONSTANTS.TEAM.ACCEPTED, CONSTANTS.TEAM.PENDING]
        }
      },
      attributes: {
        exclude: ['TeamId', 'StudentId', 'Id'],
      },
      include: [{
        model: Model.Students,
        as: 'Student',
        attributes: ['Name', 'Id'],
        include: [{
          model: Model.StudentDetails,
          as: 'Details',
          attributes: ['RollNo']
        }]
      }]
    },
    {
      model: Model.Students, as: 'TeamLeader', attributes:['Name'],
    }]
  }).then(function(data) {
    if(!data) {
      // User if not leader of the team

      r.status = statusCodes.SUCCESS;
      return res.json(data);
    }

    var inviteData = data.toJSON();
    inviteData.TeamInvites = inviteData.TeamInvites.map(function(instance) {
      instance.Student['RollNo'] = instance.Student.Details.RollNo;
      delete instance.Student.Details;
      return instance;
    });
    delete data['TeamLeaderId'];

    r.status = statusCodes.SUCCESS;
    r.data = inviteData;
    res.json(r);
  });

});


module.exports = router;
