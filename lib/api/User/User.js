var express = require('express');
var authenticateGmailToken = require('../../../middlewares/authenticateGmailToken');
var router = express.Router();
var Model = require('../../../models/index');
var statusCodes = require('../../statusCodes');
var Response = require('../../Response');
var tokenService = require('../../services/tokenService');

router.get('/search', function(req, res) {
  var r = new Response();
  if(!req.user) {
    r.status = statusCodes.NOT_AUTHORIZED;
    r.data = "You must sign in to access.";
    return res.json(r);
  }
  var q = req.query.query;

  if(q) {
    var ids = new Set();
    Model.sequelize.query("SELECT distinct StudentDetails.Id FROM Students,StudentDetails WHERE LOWER(Name) like LOWER(:query) OR PhoneNumber like :query OR RollNo like :query ", {
      replacements: {
        query: '%' + q + '%'
      }
    }).then(function(instance) {
      for(var i in instance) {
        for(var j in instance[i]) {
          ids.add(instance[i][j].Id);
        }
      }

      Model.sequelize.query("SELECT Students.Id,StudentDetails.RollNo,Students.Name FROM Students,StudentDetails WHERE Students.Id in (:studId) and Students.Id = StudentDetails.Id ", {
        replacements: {
          studId: Array.from(ids)
        }
      }).then(function(userdata) {
        var noDuplicates = Array.from(new Set(userdata));
        r.status = statusCodes.SUCCESS;
        r.data = noDuplicates;
        return res.json(r);
      }).catch(function(err) {
        r.status = statusCodes.SERVER_ERROR;
        r.data = "Something went wrong";
        return res.json(r);
      });
    });
  }
  else {
    r.status = statusCodes.BAD_INPUT;
    r.data = "You must specify 'query' parameter";
    return res.json(r);
  }
});

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
      // User was not registered, so signup
      Model.Students.create({Email:email, Name: name})
      .then(function(data) {

        if(data) {
          console.log("Successfully signed up " + email);
          var ob = data.dataValues;
          r.status = statusCodes.SUCCESS;
          r.data = {
            token: tokenService.generateToken(ob),
            name: name,
            email: email,
            IsNew: true,
            Id: ob.Id
          };

          res.json(r);
        }
        else {
          throw "Invalid signup input";
        }
      })
    .catch(function(error) {
      console.log("Error"+error);
      r.status = statusCodes.SERVER_ERROR;
      r.data = error;
      res.json(r);
    });
    }
    else {
      // if the user was already registered
      Model.Students.findOne({
        include: [{
          model: Model.StudentDetails,
          as: 'Details'
        }],
        where:{
          Email:email
        }
      })
      .then(function(data) {
          var ob = data.dataValues;
          // Check that this is the part of the data that contains the id attribute of a student
          r.status = statusCodes.SUCCESS;
          r.data = {
            token: tokenService.generateToken(ob),
            // If IsNew is 1, return false, true otherwise
            IsNew: (ob.Details.IsNew === "0" ||
              !ob.Details.IsNew
              ) ?
              true : false,
            id: ob.Id
          };
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
      include: [{
        model: Model.Students,
        as: 'Profile',
        attributes: {
          exclude: ['Id']
        }
      }],
      where: {
        Id: userId
      },
      attributes: {
        exclude: ['IsNew']
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
    toUpdate.Gender = req.body.gender;
  toUpdate.Id = userId;
  toUpdate.IsNew = true;

  console.log(toUpdate);
  Model.StudentDetails.update (toUpdate, {
    where: {
      Id: userId
    }
  })
  .then(function(data) {
    if(data[0] == 1) {
      // Updated the user info
      r.status = statusCodes.SUCCESS;
      r.data = null;
      res.json(r);
    }
    else {
      // User info added for the first time
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

router.get('/me/notifications',function(req,res) {
  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.json(r);
  }
  var userId = req.user.id;
  var timeStamp = req.query.timeStamp;
  var privateData, globalData;
  Model.UsersNotifications.findAll( {
    where: {
      StudentId: userId,
      updatedAt: { $gte: timeStamp }
  },
  include: [{model: Model.Notifications, attributes:['Message','EventId']}],
  attributes:['Id','status']
  }).then(function(data) {
    privateData = data;
    Model.Notifications.findAll( {
      where: {
        NotificationType: 'global',
        updatedAt: { $gte: timeStamp }
      },
      attributes:['Id', 'EventId','Message']
    }).then(function(data) {
      globalData = data;
      r.status = statusCodes.SUCCESS;
      r.data = [{'private' : privateData},{'global' : globalData}];
      res.json(r);
    }).catch(function(err) {
      r.status = statusCodes.SERVER_ERROR;
      r.data = err;
      return res.json(r);
    });
  }).catch(function(err) {
    r.status = statusCodes.SERVER_ERROR;
    r.data = err;
    return res.json(r);
  });

});

router.post('/me/notifications',function(req,res) {
  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.json(r);
  }
  var userId = req.user.id;
  var toUpdate = {};
  toUpdate.Status = req.body.status;
  Model.UsersNotifications.update(toUpdate , {
    where: {
      Id: req.body.notificationId
  }
  }).then(function(data) {
    r.status = statusCodes.SUCCESS;
    r.data = data;
    res.json(r);
  }).catch(function(err) {
    r.status = statusCodes.SERVER_ERROR;
    r.data = err;
    return res.json(r);
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


// getting events in interested  categories
router.get('/interestedEvents/',function(req,res) {
  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.json(r);
  }
  var userId = req.user.id;

  Model.sequelize.query("SELECT Events.Name, Events.Id, Events.CategoryId FROM Events, Interests where Interests.CategoryId=Events.CategoryId and Interests.StudentId=?", {  replacements: [userId],type: Model.sequelize.QueryTypes.SELECT})
  .then(function(events) {
    r.status = statusCodes.SUCCESS;
    r.data = events;
    res.json(r);
  },
  function(err) {
    r.status = statusCodes.SERVER_ERROR;
    r.data = err;
    res.json(r);
  });
});
module.exports = router;
