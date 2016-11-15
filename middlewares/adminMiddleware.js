var Response = require('../lib/Response');
var statusCodes = require('../lib/statusCodes');
var models = require('../models');

module.exports = function(req, res, next) {
  var r = new Response();

  if(!req.user) {
    r.status = statusCodes.INVALID_TOKEN;
    res.end(r.toString());
  }

  models.Coordinators.findAll({
    where : {
      Email: req.user.email
    }
  }).then(function(data) {
    if(data.length === 1) {
      next();
    }
    else {
      r.status = statusCodes.NOT_AUTHORIZED;
      res.end(r.toString());
    }
  }).catch(function(error) {
    console.error("Error occured while checking for admin user " + error.stack);
    r.status = statusCodes.SERVER_ERROR;
    res.end(r.toString());
  });
};
