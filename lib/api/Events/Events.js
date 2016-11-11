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
 var models = require('../../../models');

 router.get('/', function(req, res) {
   res.type('text/json');
   res.end('{"status": { "code": 200, "message": "SUCCESS"}}');
 });

 module.exports = router;
