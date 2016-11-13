var express = require('express');
var router = express.Router();

/*
* GET request is directly redirected to home page
*/
router.get('/me', function(req, res, next){
  res.send(404);
});

router.post('/me', function(req, res, next){
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

  /*
  * Update this query using joins again. IMP!!!!!!
  */
  var Query = "SELECT `teams`.`id` as ID, `teams`.`name` as `TeamName`, `teamUsers`.`isAdmin` AS `isAdmin`";
  Query += " FROM `teams` AS `teams`, `teamUsers` AS `teamUsers` ";
  Query += "WHERE `teams`.`id` = `teamUsers`.`teamId` ";
  Query += "AND `teamUsers`.`studentId` = " + userId;
  
  sequelize.query(Query, {type: sequelize.QueryTypes.SELECT}).then(function(users) {
    console.log(users);
  });

});