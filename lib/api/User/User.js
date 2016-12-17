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
  var email = req.authenticated.email.trim();
  var name = req.authenticated.name.trim();
  var r = new Response();

  if(!email) {
    r.status = statusCodes.INVALID_TOKEN;
    r.data =  "Invalid gmail token";
    res.json(r);
    return ;
  }

  Model.Students.findAll({
    where:{
      Email:email
    }
  })
  .then(function(data) {
    if(data.length === 0) {
      isNew = true;
      Model.Students.create({Email:email, Name: name})
      .then(function(data) {
        console.log("Successfully signed up " + email);
        Model.Students.find({                                    // for asynchronous call issue
          where:{                                                // finding user added inside promise of insertion
            Email:email
          }
        })
        .then(function(data){
          var ob = data.dataValues;
          r.status = statusCodes.SUCCESS;
          r.data = {
            token: tokenService.generateToken(ob)
          };
          r.data.isNew = isNew;
          res.json(r);
        })
        .catch(function(error){
          console.log("Error"+error);
          r.status = statusCodes.SERVER_ERROR;
          r.data = error;
          res.json(r);
        });
      })
    .catch(function(error) {
      console.log("Error"+error);
      r.status = statusCodes.SERVER_ERROR;
      r.data = error;
      res.json(r);
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
          res.json(r);
        })
        .catch(function(error) {
          console.log("Error"+error);
          r.status = statusCodes.SERVER_ERROR;
          r.data = error;
          res.json(r);
        });
      }
  })
  .catch(function(error){
    console.log("Error"+error);
    r.status = statusCodes.SERVER_ERROR;
    r.data = error;
    res.json(r);
    });



});


//api to get user details
router.get('/me',function(req,res) {
  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.json(r);
  }
  var userId = req.user.id;
   Model.StudentDetails.find({
      include: [
      {
        model: Model.Students,
        as: 'Profile',
        attributes: {
          exclude: ['Id']
        }
      }],
      where: {
        Id: userId
      }
   })
   .then(function(data) {
     if(data !== null) {
        r.status = statusCodes.SUCCESS;
        r.data = data.dataValues;
        res.json(r);
      }
      else {
        r.status = statusCodes.INVALID_TOKEN;
        r.data = null;
        res.json(r);
      }

   })
   .catch(function(error) {
      console.log("Error in me api "+error);
      r.status = statusCodes.SERVER_ERROR;
      r.data = error;
      res.json(r);
   });

});

//api both for updating and inserting the values
//data will be send through urlendcode form
router.post('/me',function(req,res) {
  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.json(r);
  }
  var userId = req.user.id;
  var toUpdate = {};
  if(req.body.rollNo)
    toUpdate.RollNo = req.body.rollNo;
  if(req.body.phoneNo)
    toUpdate.PhoneNumber = req.body.phoneNo;
  if(req.body.branch)
    toUpdate.Branch = req.body.branch;
  if(req.body.year)
    toUpdate.Year = req.body.year;
  if(req.body.college)
    toUpdate.College = req.body.college;
  if(req.body.gender)
    toUpdate.gender = req.body.gender;
  toUpdate.Id = userId;
  
  console.log(toUpdate);
  Model.StudentDetails.update (toUpdate, {
    where: {
      Id: userId
    }
  })
  .then(function(data) {
    if(data[0] == 1) {                      //if record doesnot exsists update the record
      r.status = statusCodes.SUCCESS;
      r.data = null;                      //change accordingly
      res.json(r);
    }
    else {                              //if record doesnot exsists insert the record
      Model.StudentDetails.create (toUpdate)
      .then(function(data) {
        r.status = statusCodes.SUCCESS;
        res.json(r);
      })
      .catch(function(err) {
        console.log("Error while inserting"+err);
        r.status = statusCodes.SERVER_ERROR;
        r.data = err;
        res.json(r);
      });
    }
  })
  .catch(function(error) {
    console.log("Error in  in updation "+error);
    r.status = statusCodes.SERVER_ERROR;
    r.data = error;
    res.json(r);
  });

});

// setting interests of arrays
router.post('/interests',function(req,res) {
  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.json(r);
  }
  var userId = req.user.id;
  var arr = JSON.parse(req.body.interests);

  // TODO: Deletion of interests is to be provided in this
  // module itself.
  // Input:
  // {
  //  add: ['1']        // Array of categories to be added
  //  delete: ['2']     // Array of categories to be removed
  // }
  arr.forEach(function(att) {
    Model.Interests.find({
      where: {
        StudentId:userId,
        CategoryId:att
      }
    })
    .then(function(data){
      if(data === null) {
        Model.Interests.create ({
          StudentId: userId,
          CategoryId: att,
        })
        .then(function(data) {
          console.log("value inserted");
        });
      }
     })
     .catch(function(error){
       console.log("Error while inserting interests"+err);
       r.status = statusCodes.SERVER_ERROR;
       r.data = err;
       res.json(r);
     });
    });

  r.status = statusCodes.SUCCESS;
  res.json(r);


});

// api for removing array of interest
router.delete('/interests',function(req,res) {
  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.json(r);
  }
  var userId = req.user.id;
  var arr = JSON.parse(req.body.interests);
  arr.forEach(function(att) {
    Model.Interests.destroy ({
      where:{
        StudentId: userId,
        CategoryId: att,
      }
    })
    .then(function(data) {
      console.log("value deleted");
    })
    .catch(function(err) {
      console.log("Error while deleting interests"+err);
      r.status = statusCodes.SERVER_ERROR;
      r.data = err;
      res.json(r);
    });
  });
  r.status =statusCodes.SUCCESS;
  res.json(r);

});

// getting interests
router.get('/interests/',function(req,res) {
  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.json(r);
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
    });
    r.status =statusCodes.SUCCESS;
    r.data = arr;
    res.json(r);
  })
  .catch(function(err) {
    console.log("Error in interest fetch api ",err);
    r.status = statusCodes.SERVER_ERROR;
    r.data = err;
    res.json(r);
  });
});

module.exports = router;
