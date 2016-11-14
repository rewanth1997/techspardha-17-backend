var tokenService = require('../../services/tokenService');

module.exports = function(req, res, next) {
  var token=req.body.token||req.query.token;
  console.log("Token is "+token);
  if(token) {
    req.user = tokenService.isValid(token);
    console.log(JSON.stringify(req.user));
  }
  next();
};
