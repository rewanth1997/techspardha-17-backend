var express=require('express');
var authenticateGmailToken=require('../../../middlewares/authenticateGmailToken');
var router = express.Router();
var Model=require('../../../models/index');
var statusCodes = require('../../statusCodes');
router.get('/authenticateToken',authenticateGmailToken,function(req,res) {
   Model.student.findAll({
    where:{
      email:req.body.email
    }
  }).then(function(data) {
      if(!data) {
        Model.student.create({
        email:req.body.email,
        name:req.body.name,
      }).then(function(insertedData) {        
          
      });
      }

     
  });
    
  });
    
  module.exports = router;

