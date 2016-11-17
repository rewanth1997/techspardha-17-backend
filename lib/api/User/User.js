var express = require('express');
var authenticateGmailToken = require('../../../middlewares/authenticateGmailToken');
var router = express.Router();
var Model = require('../../../models/index');
var statusCodes = require('../../statusCodes');
var Response = require('../../Response');
var tokenService = require('../../services/tokenService');
//to change to post
router.post('/login',authenticateGmailToken,function(req,res) { //remove console.logs
  var isNew = false;
  var email = req.body.email;
  var name = req.body.name;
  console.log("in login api");
  var r = new Response();
  Model.Students.findAll({
    where:{
      Email:email
    }
  })
  .then(function(data) {
    if(data.length==0) {
      isNew=true;
      Model.Students.create({Email:email, Name:name })
      .then(function(data) {
        console.log("Successfully inserted");
        Model.Students.find({                                    // for asynchronous call issue
          where:{                                                // finding user added inside promise of insertion
            Email:email
          }
        })
        .then(function(data){
          var ob = data.dataValues;
          r.status = statusCodes.SUCCESS;
          r.data = tokenService.generateToken(ob);
          r.data.isNew = isNew;
          res.end(r.toString());
        })
        .catch(function(error){
          console.log("Error"+error);
          r.status = statusCodes.SERVER_ERROR;
          r.data = error;
          res.end(r.toString());
        });
      })
    .catch(function(error) {
      console.log("Error"+error);
      r.status = statusCodes.SERVER_ERROR;
      r.data = error;
      res.end(r.toString());
    });
    }
    else {                                                                 // if value was already exsisting
      Model.Students.find({
        where:{
          Email:email
        }
      })
      .then(function(data) {
          var ob = data.dataValues;
          r.status = statusCodes.SUCCESS;
          r.data = tokenService.generateToken(ob);
          r.data.isNew = isNew;
          res.end(r.toString());
        })
        .catch(function(error) {
          console.log("Error"+error);
          r.status = statusCodes.SERVER_ERROR;
          r.data = error;
          res.end(r.toString());
        });
      }
  })
  .catch(function(error){
    console.log("Error"+error);
    r.status = statusCodes.SERVER_ERROR;
    r.data = error;
    res.end(r.toString());
    });



});


//api to get user details
router.get('/me',function(req,res) {
  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.end(r.toString());
  }
  var userId = req.user.id;
   Model.StudentDetails.find({
     where: {
          Id: userId                       //changed  while applying the middleware
     }
   })
   .then(function(data) {
     if(data != null) {
        r.status = statusCodes.SUCCESS;
        r.data = data.dataValues;
        res.end(r.toString());
      }
      else {
        r.status = statusCodes.INVALID_TOKEN;
        r.data = null;
        res.end(r.toString());
      }

   })
   .catch(function(error) {
      console.log("Error in me api "+error);
      r.status = statusCodes.SERVER_ERROR;
      r.data = error;
      res.end(r.toString());
   });

});

//api both for updating and inserting the values
//data will be send through urlendcode form
router.post('/me',function(req,res) {
  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.end(r.toString());
  }
  var userId = req.user.id;
  console.log("user id is "+JSON.stringify(userId) );
  Model.StudentDetails.update ({
    RollNo: req.body.rollNo,
    PhoneNumber: req.body.phoneNo,
    Branch: req.body.branch,
    Year: req.body.year,
    College: req.body.college,
    Gender: req.body.gender,
    },
    {
      where: { Id: userId }              //changed after applying token middleware
  })
  .then(function(data) {
    if(data[0] == 1) {                      //if record doesnot exsists update the record
      r.status = statusCodes.SUCCESS;
      r.data = null;                      //change accordingly
      res.end(r.toString());
    }
    else {                              //if record doesnot exsists insert the record
      Model.StudentDetails.create ({
        RollNo: req.body.rollNo,
        PhoneNumber: req.body.phoneNo,
        Branch: req.body.branch,
        Year: req.body.year,
        College: req.body.college,
        Gender: req.body.gender,
        Id: userId                         //change after applying token middleware
      })
      .then(function(data) {
        r.status = statusCodes.SUCCESS;
        res.end(r.toString());
      })
      .catch(function(err) {
        console.log("Error while inserting"+err);
        r.status = statusCodes.SERVER_ERROR;
        r.data = err;
        res.end(r.toString());
      });
    }
  })
  .catch(function(error) {
    console.log("Error in  in updation "+error);
    r.status = statusCodes.SERVER_ERROR;
    r.data = error;
    res.end(r.toString());
  });

});

// setting interests of arrays
router.post('/interests',function(req,res) {
  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.end(r.toString());
  }
  var userId = req.user.id;
  var arr = JSON.parse(req.body.interests);
  console.log(userId);
  arr.forEach(function(att) {
    Model.Interests.find({
      where: {
        StudentId:userId,
        CategoryId:att
      }
    })
    .then(function(data){
      if(data==null) {
        Model.Interests.create ({
          StudentId: userId,
          CategoryId: att,
        })
        .then(function(data) {
          console.log("value inserted");
        })
        .catch(function(err) {
          console.log("Error while inserting interests"+err);
          r.status = statusCodes.SERVER_ERROR;
          r.data = JSON.stringify(err);
          res.end(r.toString());
        });
      }
     })
     .catch(function(error){
       console.log("Error while inserting interests"+err);
       r.status = statusCodes.SERVER_ERROR;
       r.data = JSON.stringify(err);
       res.end(r.toString());
     });
    });

  r.status = statusCodes.SUCCESS;
  r.data = null;                      //change accordingly
  res.end(r.toString());


});

// api for removing array of interest
router.delete('/interests',function(req,res) {
  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.end(r.toString());
  }
  var userId = req.user.id;           //changed after
  var arr = JSON.parse(req.body.interests);
  arr.forEach(function(att) {
    Model.Interests.destroy ({
      where:{
        StudentId: userId,                           // change it after applying token middleware
        CategoryId: att,
      }
    })
    .then(function(data) {
      console.log("value deleted");
    })
    .catch(function(err) {
      console.log("Error while deleting interests"+err);
      r.status = statusCodes.SERVER_ERROR;
      r.data = JSON.stringify(err);
      res.end(r.toString());
    });
  });
  r.status =statusCodes.SUCCESS;
  r.data = null;                      //change accordingly
  res.end(r.toString());

})

// getting interests
router.get('/interests/',function(req,res) {
  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.end(r.toString());
  }
  var userId = req.user.id;
  Model.Interests.findAll ({
    attributes : ['CategoryId'],
    where : {
      StudentId:userId
    }
  })
  .then(function(data) {
    var arr = [];
    data.forEach(function(elems) {
      arr.push(elems.dataValues.CategoryId);
    })
    r.status =statusCodes.SUCCESS;
    r.data = arr;
    res.end(r.toString());
  })
  .catch(function(err) {
     console.log("Error in interest fetch api ",err);
     r.status = statusCodes.SERVER_ERROR;
     r.data = err;
     res.end(r.toString());

  })
})

  module.exports = router;
