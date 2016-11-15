var tokenService = require('../lib/services/tokenService');
var models = require('../models');


module.exports = function(req, res, next) {
  var token=req.body.token||req.query.token;
  if(token) {
    req.user = tokenService.isValid(token);
  }
  next();
};
