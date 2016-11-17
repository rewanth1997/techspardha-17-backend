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
          Status: false
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
        Status: true
      },{
        where: ['TeamId = ? AND StudentId = ?',teamId,studentId]
      }).then(function(data) {
        console.log("successfully updated");
        r.status = statusCodes.SUCCESS;
        r.data = 'Accepted Invite Successfully';
        res.json(r);
      }).catch(function(err) {
        r.status = statusCodes.SERVER_ERROR;
        r.data = err;
        res.json(r);
      });
      break;

    case 'decline':

      studentId = teamLeaderId;
      Model.TeamInvites.destroy({
        where: ['TeamId = ? AND StudentId = ?',teamId,studentId]
      }).then(function(data){
          console.log('Rejected');
          r.status = statusCodes.SUCCESS;
          r.data = 'Successfully Rejected Invite';
          res.json(r);
      }).catch(function(err) {
        r.status = statusCodes.SERVER_ERROR;
        r.data = err;
        res.json(r);
      });
      break;
  }

});

module.exports = router;
