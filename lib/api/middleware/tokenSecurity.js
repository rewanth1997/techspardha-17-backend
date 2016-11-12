var tokenService = require('../../services/tokenService');

module.exports = function(req, res, next) {
  req.user = tokenService.isValid(req.body.token);
  next();
};
