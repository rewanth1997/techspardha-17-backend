var express = require('express');
var router = express.Router();
var app = express();
var Teams = require('../../../../models/teams');
var Model = require('../../../../models');
console.log("outside fn");
/*
* GET request is directly redirected to home page
*/
router.post('/', function(req, res, next){
  console.log(Teams.toString());
  res.end('done');
  //res.redirect('/');
});

router.get('/', function(req, res, next){
  console.log("in get request");
  console.log("-----------------------");
  console.log(req.params);
  console.log("-----------------------");
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
  var teamLeaderId = 0;
  var emailId = 1;
  var teamName = req.query.teamName;
  var eventId = req.query.eventId;
  
  console.log(teamName);
  console.log(eventId);
  
  Model.Teams.create({
       Name: teamName,
       EventId: eventId,
       CurrentLevel: 0
  }).then(function(err, data) {
    if(err)
      console.log(err);
    else
      console.log("Inserted into Teams table");
  });

  Model.TeamUsers.create({
      StudentId: teamLeaderId,
      EventId: eventId
  }).then(function(err, data) {
    if(err)
      console.log(err);
    else
      console.log("Inserted into TeamUsers table");
  });

//   * Adding the user to the userTeams table
  
//   sequelize.sync().success(function(){
//     /*
//     * TeamUsers model is to be created here attached with teams table.
//     */
//     TeamUsers.create({
//       teamId : teamName,
//       studentId: teamLeaderId,
//       eventId: eventId,
//       isAdmin: true
//     }).success(function(data){
//       console.log(data);
//     })
//   });  

 });

module.exports = router;