var express = require('express');
var router = express.Router();
var app = express();

router.get('/api/team/all', function(req, res) {
 
  /*
  * decodes the token by calling
  * the verification code
  * var tokenDetails = [userId, emailId]
  */
	var userId = tokenDetails[0];
  var emailId = tokenDetails[1];

  var Query = "SELECT * FROM `teams`";

  sequelize.query(Query, {type: sequelize.QueryTypes.SELECT}).then(function(users) {
    console.log(users);
  });

});
