var request = require('request');
var Response = require('../lib/Response');
var statusCodes = require('../lib/statusCodes');
var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth();
var env       = process.env.NODE_ENV || 'development';
var config    = require('../config/config.json')[env];
var client = new auth.OAuth2(config.CLIENT_ID, '', '');

var authenticateGmailToken = function(req,res,next) {
  var idToken = req.body['idToken'];
  var accessToken = req.body['accessToken'];
  var r = new Response();

  if(idToken) {
    client.verifyIdToken(
      idToken,
      config.CLIENT_ID,
      function(e, login) {
        if(!login) {
          r.status = statusCodes.INVALID_TOKEN;
          return res.json(r);
        }
        var payload = login.getPayload();
        req.authenticated = {
          name: payload.name,
          email: payload.email,
        };

        return next();
      });
  }
  else {
    request.get("https://www.googleapis.com/plus/v1/people/me?access_token=" + accessToken,function(error,response,body){
      if(response.statusCode == 200) {
      	var bod = JSON.parse(response.body);
        req.authenticated = {
          email: bod.emails[0].value,
          name: bod.displayName
        };
        next();
      }
      else {

      	r.status = statusCodes.INVALID_TOKEN;
        res.json(r);
      }

    });
  }

};
module.exports=authenticateGmailToken;
