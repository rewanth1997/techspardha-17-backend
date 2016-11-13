var express = require('express');
var router = express.Router();
var Teams = require('../../../../models/teams');
var Model = require('../../../../models');
var app = express();

router.delete('/:id', function(req, res, next) {

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
  var tokenDetails = [10,15]
  var teamLeaderId = tokenDetails[0];
  var emailId = tokenDetails[1];

  var teamId = req.query.teamId;

  /*
  * Create a the model Team from teams table
  */
/*
  Teams.find({where: {id: teamId}}).complete(function(err, data) {
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
          res.send("success");
  			}
  		});
  	}
  });
  */
  Model.Teams.findAll({
    attributes: ['id'],
    where: {
      id: teamId
    }
  }).then(function(data){
    if(data.length == 1) {
      Model.Teams.destroy({
        where: {
          id: teamId
        }
      }).then(function(data) {
        console.log(JSON.stringify(data));
      }).catch(function(err) {
        console.log("******************")
      });
    }
    else {
      res.send("Invalid team id");
    }
  }).catch(function(err){
    console.log('----------------------------------Error--------------------------------------------------');
    console.log(err);
  })

});

module.exports = router;