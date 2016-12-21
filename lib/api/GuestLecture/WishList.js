/*
* This file consists of WishList routers
* Routes here are
*   - See your wishlist ( Subscribed guest lectures )
*   - Subscribe for a guest lecture
*   - Unsubscribe for a guest lecture
*/

var express = require('express');
var router = express.Router();
var models = require('../../../models');
var Model = require('../../../models/index');
var Response = require('../../Response');
var statusCodes = require('../../statusCodes');
var tokenService = require('../../services/tokenService');
var adminMiddleware = require('../../../middlewares/adminMiddleware');

router.get('/', function(req, res) {
	var r = new Response();
	r.status = statusCodes.NOT_AUTHORIZED;
	r.data = "Login to access the list";
	res.end(r.toString());
});

router.post('/', function(req, res) {
  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.json(r);
  }

  var userId = req.user.id;

  Model.WishList.findAll({
    attributes: ['Id','LectureId'],
    where: {
      StudentId: userId
    }
  }).then(function(data) {
    r.status = statusCodes.SUCCESS;
    r.data = "Successfully fetched the wishlist";
    res.end(r.toString());
  }).catch(function(err) {
    r.status = statusCodes.SERVER_ERROR;
    r.data = "Unable to fetch the wishlist";
    res.end(r.toString());
  })
});

router.post('/:Id', function(req, res, next) {
  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.json(r);
  }

  var userId = req.user.id;
  var LectureId = req.params.Id;

  Models.WishList.create({
    LectureId: LectureId,
    StudentId: userId
  }).then(function(data) {
    r.status = statusCodes.SUCCESS;
    r.data = "Successfully added to your wishlist";
  }).catch(function(err) {
    r.status = statusCodes.SERVER_ERROR;
    r.data = err;
    res.end(r.toString());
  });

});

router.delete('/:Id', function(req, res, next) {
  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.json(r);
  }

  var userId = req.user.id;
  var LectureId = req.params.Id;

  Model.WishList.findAll({
    attributes: ['Id'],
    where: {
      LectureId: LectureId,
      StudentId: userId
    }
  }).then(function(data) {
    if(data.length >= 1) {
      Model.WishList.destroy({
        where: {
          LectureId: LectureId,
          StudentId: userId
        }
      }).then(function(data) {
        r.status = statusCodes.SUCCESS;
        r.data = "Unsubscribed from the requested Guest Lecture";
        res.send(r.toString());
      }).catch(function(err) {
        r.status = statusCodes.SERVER_ERROR;
        r.data = err;
        res.end(r.toString());
      });
    } 
    else {
      r.status = statusCodes.SERVEER_ERROR;
      r.data = "Guest Lecture not in your wishlist";
      res.end(r.toString());
    }
  });

});

module.exports = router;
