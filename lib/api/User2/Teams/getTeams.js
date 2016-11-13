var express = require('express');
var router = express.Router();
var Teams = require('../../../../models/teams');
var Model = require('../../../../models');

router.get('/:eventId', function(req, res) {
 
  /*
  * decodes the token by calling
  * the verification code
  * var tokenDetails = [userId, emailId]
  */
  var tokenDetails = [10,15]
	var userId = tokenDetails[0];
  var emailId = tokenDetails[1];

  var eventId = req.params.eventId;

  Model.Teams.findAll({
    attributes: ['id'],
    where: {
      EventId: eventId
    }
  }).then(function(data) {
    res.send(JSON.stringify(data));
  });

});

module.exports = router;