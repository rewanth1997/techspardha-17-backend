var express = require('express');
var router = express.Router();
var Teams = require('../../../../models/teams');
var Model = require('../../../../models');
// var Response = require('../../Response');                             //To be uncommented
// var statusCodes = require('../../statusCodes');
// var tokenService = require('../../services/tokenService');

router.get('/:eventId', function(req, res) {

// var r = new Response();
  var eventId = req.params.eventId;
  Model.Teams.findAll({
    attributes: ['id','Name'],
    where: {
      EventId: eventId
    }
  }).then(function(data) {
    res.send(JSON.stringify(data));                     //to be changed afterwards
  });

});

module.exports = router;
