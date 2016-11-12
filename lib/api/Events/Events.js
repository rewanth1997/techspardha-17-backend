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

router.get('/', function(req, res) {
  var r = new Response();
  Model.Events.findAll({
  }).then(function(data) {
    r.status = statusCodes.SUCCESS;
    res.end(r.toString());
  }).catch(function(err){
    r.status = statusCodes.SERVER_ERROR;
    r.data = err;
    res.end(r.toString());
  });
});

module.exports = router;
