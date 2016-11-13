var express = require('express');
var authenticateGmailToken = require('../../../middlewares/authenticateGmailToken');
var router = express.Router();
var Model = require('../../../models/index');
var statusCodes = require('../../statusCodes');
var Response = require('../../Response');
var tokenService = require('../../services/tokenService');
router.get('/authenticateToken',authenticateGmailToken,function(req,res) { //remove console.logs   
  var isNew=false;
  var email=req.body.email;
  var name=req.body.name;
  Model.Students.findAll({           
    where:{
      email:email
    }
  })
  .then(function(data) {         
    if(data.length==0) {
      isNew=true;
      Model.Students.create({email:email, name:name })       
      .then(function(data) {
        console.log("Successfully inserted");
      }) 
    .catch(function(error) {
      console.log("Error"+error);
      var r=new Response();
      r.status = statusCodes.SERVER_ERROR;
      r.data = error;
      res.end(r.toString());
    });
    }
  })
  .catch(function(error){
    console.log("Error"+error);
    var r=new Response();
    r.status = statusCodes.SERVER_ERROR;
    r.data = error;
    res.end(r.toString());
    });

    
  Model.Students.find({                         
    where:{
      email:email
    }
  })
  .then(function(data){   
    var ob=data.dataValues;
    var r=new Response();
    r.status =statusCodes.SUCCESS;
    r.data = tokenService.generateToken(ob);
    r.data.isNew=isNew;
    res.end(r.toString());
  })
  .catch(function(error){
    console.log("Error"+error);
    var r=new Response();
    r.status = statusCodes.SERVER_ERROR;
    r.data = error;
    res.end(r.toString());
  });
});


//api to get user details
router.get('/me/fetch',function(req,res) {      
   //apply a middleware for checking the token
   Model.StudentDetails.find({
     where:{
          id:req.query.id                       //change it while applying the middleware
     }
   })
   .then(function(data) {                   //insert error here
      if(data!=null) {
        var r=new Response();
        r.status =statusCodes.SUCCESS;
        r.data = data.dataValues;
        res.end(r.toString());
      }
      else {
        var r=new Response();
        r.status =statusCodes.INVALID_TOKEN;
        r.data = null;
        res.end(r.toString());
      }
      
   }) 
   .catch(function(error) {
      console.log("Error in me api "+error);
      var r=new Response();
      r.status = statusCodes.SERVER_ERROR;
      r.data = error;
      res.end(r.toString());
   });

});

//add middleware for cecking token
//api both for updating and inserting the values
//insert middleware fro token
//data will be send through urlendcode form
router.post('/me/update',function(req,res) {
  Model.StudentDetails.update ({
    RollNo:req.body.rollNo,
    PhoneNumber:req.body.phoneNo,
    Branch:req.body.branch,
    Year:req.body.year,
    College:req.body.college,
    Gender:req.body.gender,
    },
    {
      where:{ id:req.body.id }              //change after applying token middleware
  })
  .then(function(data) {
    if(data[0]==1) {                      //if record doesnot exsist update the record
      var r=new Response();
      r.status =statusCodes.SUCCESS;
      r.data = null;                      //change accordingly
      res.end(r.toString());
    }
    else {                              //if record doesnot exsist insert the record
      Model.StudentDetails.create ({
        RollNo:req.body.rollNo,
        PhoneNumber:req.body.phoneNo,
        Branch:req.body.branch,
        Year:req.body.year,
        College:req.body.college,
        Gender:req.body.gender,
        id:req.body.id                          //change after applying token middleware
      })
      .then(function(data) {
        var r=new Response();
        r.status =statusCodes.SUCCESS;
        r.data = null;                      //change accordingly
        res.end(r.toString());
      })
      .catch(function(err) {
        console.log("Error while inserting"+err);
        var r=new Response();
        r.status = statusCodes.SERVER_ERROR;
        r.data = JSON.stringify(err);
        res.end(r.toString());
      })
    }
  })
  .catch(function(error) {
    console.log("Error in  in updation "+error);
    var r=new Response();
    r.status = statusCodes.SERVER_ERROR;
    r.data = err;
    res.end(r.toString());
  })

});
// getting interests
//setting interests
  module.exports = router;

