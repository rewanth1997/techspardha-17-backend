/*
* This file consists of WishList routes
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


// See your wish list
router.get('/', function(req, res) {
  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.NOT_AUTHORIZED;
    return res.json(r);
  }

  var userId = req.user.id;

  Model.WishList.findAll({
    attributes: ['LectureId'],
    where: {
      StudentId: userId
    }
  }).then(function(data) {
    r.status = statusCodes.SUCCESS;
    r.data = data.map(function(obj) { return obj.LectureId; });
    res.json(r);
  }).catch(function(err) {
    r.status = statusCodes.SERVER_ERROR;
    r.data = "Unable to fetch the wishlist";
    res.json(r);
  });
});

// Add a guest lecture to your wishlist ( Similar to subscribing )
router.post('/:Id', function(req, res, next) {
  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.NOT_AUTHORIZED;
    return res.json(r);
  }

  var userId = req.user.id;
  var LectureId = req.params.Id;

  models.WishList.findOrCreate({
		where: {
	    LectureId: LectureId,
	    StudentId: userId
		}
  }).then(function(data) {
    r.status = statusCodes.SUCCESS;
    r.data = "Successfully added to your wishlist";
		res.json(r);
  }).catch(function(err) {
    r.status = statusCodes.SERVER_ERROR;
    r.data = err;
    res.json(r);
  });

});

// Delete a guest lecture to your wishlist ( Similar to unsubscribing )
router.delete('/:Id', function(req, res, next) {
  var r = new Response();
  if(req.user === undefined) {
    r.status = statusCodes.NOT_AUTHORIZED;
    return res.json(r);
  }

  var userId = req.user.id;
  var LectureId = req.params.Id;

  Model.WishList.destroy({
    where: {
      LectureId: LectureId,
      StudentId: userId
    }
  }).then(function(data) {
		if(data) {
			r.status = statusCodes.SUCCESS;
	    r.data = "Unsubscribed from the requested Guest Lecture";
		}
		else {
			r.status = statusCodes.SERVER_ERROR;
      r.data = "Guest Lecture not in your wishlist";
		}

		res.send(r);
  }).catch(function(err) {
    r.status = statusCodes.SERVER_ERROR;
    r.data = err;
    res.json(r);
  });
});

module.exports = router;
