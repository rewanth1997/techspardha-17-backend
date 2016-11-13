var express = require('express');
var router = express.Router();
var app = express();

/*
* GET request is directly redirected to home page
*/
router.get('/api/team/acceptInvite', function(req, res, next){
  res.redirect('/');
});

router.post('/api/team/acceptInvite' function(req, res, next){
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
  var userId = tokenDetails[0];
  var emailId = tokenDetails[1];

  var teamId = req.body.teamId;
  var eventId = req.body.eventId;

  /*
  * Deleting from teamInvites table , so that it wont be
  * shown in the notifications table
  */
  var deleteQuery = "DELETE FROM `teamInvites` WHERE `teamId` = " + teamId + " AND `studentId` = " + userId;
  sequelize.query(deleteQuery).spread(function(results, metadata) {
    console.log(metadata);
  });
});