var express = require('express');
var router = express.Router();
var Teams = require('../../../../models/teams');
var Model = require('../../../../models');

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
  var tokenDetails = [1,1]
  var teamLeaderId = tokenDetails[0];
  var emailId = tokenDetails[1];
  var teamName = req.query.teamName;
  var eventId = req.query.eventId;
  var teamId;
    
  // Inserting data into Teams table by creating a new table.
  Model.Teams.create({
       Name: teamName,
       EventId: eventId,
       StudentId: teamLeaderId
  }).then(function(data) {
    console.log("++++++++++++++++++++++++++++++++++++++++++++");
    console.log("Data Successfully Inserted into Teams table");
    console.log("++++++++++++++++++++++++++++++++++++++++++++");
  }).catch(function(err) {
    console.log('----------------------------------Error--------------------------------------------------');
    console.log(err);
  });

 });

module.exports = router;