var express = require('express');
var router = express.Router();
var app = express();

/*
* GET request is directly redirected to home page
*/
router.get('/api/team/create', function(req, res, next){
  res.redirect('/');
});

router.post('/api/team/create', function(req, res, next){
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
  var teamName = req.body.teamName;
  var eventId = req.body.eventId;
  
  // This method is used for immediate insertion into the database
  sequelize.sync().success(function(){
    /*
    * Team model is to be created here attached with teams table.
    */
    Team.create({
      name: teamName,
      eventId: eventId,
      curLevel: 0
    }).success(function(data){
      console.log(data);
    })
  });

  /*
  * Adding the user to the userTeams table
  */
  sequelize.sync().success(function(){
    /*
    * TeamUsers model is to be created here attached with teams table.
    */
    TeamUsers.create({
      teamId : teamName,
      studentId: teamLeaderId,
      eventId: eventId,
      isAdmin: true
    }).success(function(data){
      console.log(data);
    })
  });  

});
