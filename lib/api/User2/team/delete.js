var express = require('express');
var router = express.Router();
var app = express();

/*
* GET request is directly redirected to home page
*/
router.get('/api/team/delete', function(req, res, next) {
  res.redirect('/');
});

router.get('/api/team/delete', function(req, res, next) {

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

  /*
  * Create a the model Team from teams table
  */

  Team.find({where: {id: teamId}}).complete(function(err, data) {
  	if(err) {
  		console.log(err);
  	}
  	else {
  		data.destroy({}).success(function(err, data) {
  			if(err) {
  				console.log(err);
  			}
  			else {
  				console.log(data);
  			}
  		});
  	}
  });
  
});