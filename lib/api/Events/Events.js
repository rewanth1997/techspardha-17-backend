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
  var query = req.query.query;
  if(query !== undefined ){
    Model.Events.findAll({
      attributes: ['id','Name','Society'],
      include: [{ model: Model.Category,
                  attributes: ['id']}],
      where: ['MATCH(Events.Name,Description,Society) AGAINST(?) or Category.Name = ?', query,query]  
    }).then(function(data) {
      console.log(JSON.stringify(data));
      r.status = statusCodes.SUCCESS;
      r.data = JSON.stringify(data);
      return res.end(r.toString());
    }).catch(function(err){
      console.log(err);
      r.status = statusCodes.SERVER_ERROR;
      r.data = err;
      return res.end(r.toString());
    });
  }
  else {
    Model.Events.findAll({
      include: [{ model: Model.Category ,
                  attributes: ['id']}],
      attributes: ['Id','Name','Society']
    }).then(function(data) {
      r.status = statusCodes.SUCCESS;
      r.data = JSON.stringify(data);
      return res.end(r.toString());
    }).catch(function(err){
      r.status = statusCodes.SERVER_ERROR;
      r.data = err;
      return res.end(r.toString());
    });
  }
});

module.exports = router;
