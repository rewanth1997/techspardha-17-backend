var express = require('express');
var router = express.Router();
var Teams = require('../../../../models/teams');
var Model = require('../../../../models');
var Response = require('../../../Response');
var statusCodes = require('../../../statusCodes');
var tokenService = require('../../../services/tokenService');

router.get('/:eventId', function(req, res) {

 var r = new Response();
  var eventId = req.params.eventId;
  Model.Teams.findAll({
    attributes: ['Id','Name','TeamLeaderId'],
    where: {
      EventId: eventId
    }
  }).then(function(data) {
    r.status = statusCodes.SUCCESS;
    r.data = data;
    res.end(r.toString());
  }).catch(function(err){
    r.status = statusCodes.SERVER_ERROR;
    r.data = err;
    res.end(r.toString());
  });

});

module.exports = router;
