/**
 *  For protected routes like updating user preferences,
 *  registering for an event, accepting an invite etc,
 *
 *  We can use a middleware which will inject a key in
 *  req object, like authrizationLevel, which will be used
 *  to determine whether the user is allowed to perform
 *  this request or not.
 */

var express = require('express');
var router = express.Router();
var Model = require('../../../models');
var Response = require('../../Response');
var statusCodes = require('../../statusCodes');
var tokenService = require('../../services/tokenService');

router.post('/:id', function(req, res) {
  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.end(r.toString());
  }
  var eventId = req.params.id;
  var userId = req.body.userId;
  Model.EventRegister.create({ Id: userId, EventId: eventId })
  .then(function(data) {
    console.log("Record Inserted");
    r.status = statusCodes.SUCCESS;
    return res.end(r.toString());
  })
  .catch(function(err) {
    r.status = statusCodes.SERVER_ERROR;
    r.data = err;
    return res.end(r.toString());
  });
});

router.delete('/:id', function(req, res) {
  var r = new Response();
  if(req.user === undefined ) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.end(r.toString());
  }
  var eventId = req.params.id;
  var userId = req.body.userId;
  Model.EventRegister.destroy({where: {Id: userId, EventId : eventId}}).then( function(err,data) {
      if(err) {
        console.log(err);
        r.status = statusCodes.SERVER_ERROR;
        r.data = err;
        return res.end(r.toString());
      }
      else {
        console.log(data);
        r.status = statusCodes.SUCCESS;
        return res.end(r.toString());
      }
    });
});

module.exports = router;
