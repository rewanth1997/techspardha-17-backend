var express = require('express');
var router = express.Router();
var Model = require('../../../../models');
var SendInvites = require('../../../../models/teamInvites');


router.post('/:teamId/invite', function(req, res, next){

  // var r = new Response();                                          //To be uncommented

  // if(req.user === undefined) {
  //   r.status = statusCodes.INVALID_TOKEN;
  //   return res.end(r.toString());
  // }

  // var teamLeaderId = req.user.id;
  /* Responses to be add in all then and catch blocks
  */
  var teamLeaderId = 1;                                                //To be deleted
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
          console.log(err);
        });
      });
      break;

    case 'accept':
      var studentId = teamLeaderId;
      Model.TeamInvites.update({
        Status: true
      },{
        where: ['TeamId = ? AND StudentId = ?',teamId,studentId]
      }).then(function(data) {
        console.log("successfully updated");
      });
      //res.end()                           //To be uncommented
      break;

    case 'decline':
      studentId = teamLeaderId;
      Model.TeamInvites.destroy({
        where: ['TeamId = ? AND StudentId = ?',teamId,studentId]
      }).then(function(data){
          console.log('Rejected');                 //To be changed to response
      });
      break;
  }

});

module.exports = router;
