var tokenService = require('../lib/services/tokenService');
var models = require('../models');
var Response = require('../lib/Response');
var statusCodes = require('../lib/statusCodes');
var r = new Response();

module.exports = function(req, res, next) {
  var token=req.body.token||req.query.token;
  if(token) {
    try {
      req.user = tokenService.isValid(token);
    }
    catch(e) {
      r.status = statusCodes.INVALID_TOKEN;
      res.json(r);
    }
  }
  next();
};
