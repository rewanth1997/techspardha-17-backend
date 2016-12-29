var Response = require('../lib/Response');
var statusCodes = require('../lib/statusCodes');
var models = require('../models');

module.exports = function(req, res, next) {
  var r = new Response();

  if(!req.user) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.json(r);
  }

  models.Coordinators.findAll({
    where : {
      Email: req.user.email
    }
  }).then(function(data) {
    if(data.length) {
      next();
    }
    else {
      r.status = statusCodes.NOT_AUTHORIZED;
      return res.json(r);
    }
  }).catch(function(error) {
    console.error("Error occured while checking for admin user " + error.stack);
    r.status = statusCodes.SERVER_ERROR;
    return res.json(r);
  });
};
