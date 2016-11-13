var express = require('express');
var router = express.Router();
var app = express();

/*
* GET request is directly redirected to home page
*/
router.get('/api/team/sendInvite', function(req, res, next){
  res.redirect('/');
});

router.post('/api/team/sendInvite' function(req, res, next){
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

  var teamLeaderId = tokenDetails[0];
  var emailId = tokenDetails[1];
  
  var teamId = req.body.teamId;
  var members = req.body.invites;

  members.forEach(function(memberId) {
  	var data = Invite.build({
  		teamId: teamId,
  		studentId: memberId,
  		status: 'Not accepted'
  	});
  	data.save().complete(function(err) {
      if(err) {
      	console.log(err);
      }
      else {
        console.log("Invitation sent successfully");
      }
  	});
  });

});