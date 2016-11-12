var tokenService = require('../../service/tokenService');

module.exports = function(req, res, next) {
  req.user = tokenService.isValid(req.query.token);
  next();
};
