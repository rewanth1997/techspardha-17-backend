/**
 * This file listens for all routes of coordinators
 *    - List Event
 *    - Update Event
 *    - Send participants to next round
 */

var express = require('express');
var router = express.Router();
var models = require('../../../models');
var Response = require('../../Response');
var statusCodes = require('../../statusCodes');
var tokenService = require('../../services/tokenService');

/**
 * Login function
 * @constructor
 * @param {String} username
 * @param {String} password
 * @return {String} Token
 */

router.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var r = new Response();

  if(!username || !password) {
    r.status = statusCodes.BAD_INPUT;
    r.data = {error: "Username and password are required"};
    res.json(r);

    return ;
  }

  models.Coordinators.findAll({
    attributes: ['Id', 'Email'],
    where: {
      Username: username,
      Password: password
    }
  }).then(function(data) {
    if(data.length === 1) {
      var token = tokenService.generateToken(data[0].dataValues);
      r.status = statusCodes.SUCCESS;
      r.data = { token: token };
    }
    else {
      r.status = statusCodes.INVALID_CREDENTIALS;
    }
    res.json(r);

  }).catch(function(error) {
    r.status = statusCodes.SERVER_ERROR;
    r.data = error;
    res.json(r);

  });
});

module.exports = router;
