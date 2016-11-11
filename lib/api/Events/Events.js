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

router.get('/test', function(req, res) {
  Model.events.findAll({
    attributes: ['id', 'name']
  }).then(function(data) {
    console.log(JSON.stringify(data));
  });
});

module.exports = router;
