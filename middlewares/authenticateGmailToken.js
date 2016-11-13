var request=require('request');
var authenticateGmailToken=function(req,res,next) {
var userToken=req.query.gmailToken;
var Response=require('../lib/Response');
var statusCodes = require('../lib/statusCodes');
//var clientId='679139204576-92doaqm03ubptl267md0o897rh7s9llu.apps.googleusercontent.com';
request.get("https://www.googleapis.com/plus/v1/people/me?access_token="+userToken,function(error,response,body){

  if(response.statusCode==200) {
  	var bod=JSON.parse(response.body);
  	
  	req.body.email=bod.emails[0].value;
  	req.body.name=bod.displayName;

    next();  
  }
  else {
  	var r=new Response();
  	r.status = statusCodes.INVALID_TOKEN;
    r.data = null;
    res.end(r.toString());
  }

           
         
});
  
  
  
};
module.exports=authenticateGmailToken;