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

router.post('/:id', function(req, res) {
  // if(req.user === undefined) {
  //   return res.end('{"status: {"code": 401,"message": "Unauthorized Access"}}');
  // }
  var eventId = req.params.id;
  var userId = req.body.userId;
  Model.EventRegister.create({ id: userId, eventId: eventId })
  .then(function(data) {
    console.log("Record Inserted");
    res.end('{"status: {"code": 200,"message": "Record Inserted"}}');
  });
  res.end('adf');
});


module.exports = router;
