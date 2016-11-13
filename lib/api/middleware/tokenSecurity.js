var tokenService = require('../../services/tokenService');

module.exports = function(req, res, next) {
  if(req.body.token) {
    req.user = tokenService.isValid(req.body.token);
  }
  next();
};
