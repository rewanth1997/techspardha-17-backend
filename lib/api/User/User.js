var express=require('express');
var authenticateGmailToken=require('../../../middlewares/authenticateGmailToken');
var router = express.Router();
var Model=require('../../../models/index');
var statusCodes = require('../../statusCodes');
var Response=require('../../Response');
var tokenService=require('../../services/tokenService');
router.get('/authenticateToken',authenticateGmailToken,function(req,res) {    
  var isNew=false;
  var email=req.body.email;
  var name=req.body.name;
  Model.student.findAll({
    where:{
      email:email
    }
  })
  .then(function(data) {
    if(data.length==0) {
      isNew=true;
      Model.student.create({email:email, name:name })
      .then(function(data) {
        console.log("Successfully inserted");
      }) 
    .catch(function(error) {
      console.log("Hell1");
      var r=new Response();
      r.status = statusCodes.SERVER_ERROR;
      r.data = error;
      res.end(r.toString());
    });
    }
  })
  .catch(function(error){
    console.log("Hell2");
    var r=new Response();
    r.status = statusCodes.SERVER_ERROR;
    r.data = error;
    res.end(r.toString());
    });

    
  Model.student.find({
    where:{
      email:email
    }
  })
  .then(function(data){
    var ob=data.dataValues;
    var r=new Response();
    r.status =statusCodes.SUCCESS;
    r.data = tokenService.generateToken(ob);
    res.end(r.toString());
  })
  .catch(function(error){
    console.log("Hell5");
    var r=new Response();
    r.status = statusCodes.SERVER_ERROR;
    r.data = error;
    res.end(r.toString());
  });
});
  module.exports = router;

