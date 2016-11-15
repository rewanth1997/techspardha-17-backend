var express = require('express');
var router = express.Router();
var models = require('../../../models');
var Response = require('../../Response');
var statusCodes = require('../../statusCodes');
var CONSTANTS = require('../../constants');
var userService = require('../../services/userService');
var adminMiddleware = require('../../../middlewares/adminMiddleware');

router.get('/', function(req, res) {
  var r = new Response();
  var query = req.query.query;
  if(query !== undefined ){
    models.Events.findAll({
      attributes: ['id','Name','Society'],
      include: [{
        model: models.Category,
        attributes: ['id']
      }],
      where: ['MATCH(Events.Name,Description,Society) AGAINST(?) or Category.Name like ?', query,'%'+query+'%']
    }).then(function(data) {
      console.log(JSON.stringify(data));
      r.status = statusCodes.SUCCESS;
      r.data = JSON.stringify(data);
      return res.end(r.toString());
    }).catch(function(err){
      console.log(err);
      r.status = statusCodes.SERVER_ERROR;
      r.data = err;
      return res.end(r.toString());
    });
  }
  else {
    models.Events.findAll({
      include: [{ model: models.Category ,
                  attributes: ['id']}],
      attributes: ['Id','Name','Society']
    }).then(function(data) {
      r.status = statusCodes.SUCCESS;
      r.data = JSON.stringify(data);
      return res.end(r.toString());
    }).catch(function(err){
      r.status = statusCodes.SERVER_ERROR;
      r.data = err;
      return res.end(r.toString());
    });
  }
});

/**
 * Register a new request by post request to /api/events
 * @param Start - start DATETIME of the event
 *                or Date() object in javascript
 *                e.g. Tue Nov 15 2016 00:44:20 GMT+0530 (IST)
 * @param End -   Similar to start, instead represents
 *                end DATETIME of the event
 */
router.post('/', adminMiddleware, function(req, res) {
  var r = new Response();

  var name = req.body.name;
  var desc = req.body.description;
  var venue = req.body.venue;
  var start = new Date(req.body.start);
  var end = new Date(req.body.end);
  var categoryId = req.body.categoryId;
  var societyId = req.body.societyId;
  if(isNaN(start.getTime()) || isNaN(end.getTime())) {
    r.status = statusCodes.BAD_INPUT;
    r.data = "Start and End parameters must be Date object";
    res.end(r.toString());
  }
  else if(!categoryId) {
    r.status = statusCodes.BAD_INPUT;
    r.data = "Category ID is required parameter";
    res.end(r.toString());
  }
  else if(!societyId) {
    r.status = statusCodes.BAD_INPUT;
    r.data = "Society ID is required parameter";
    res.end(r.toString());
  }
  else {
    var currentRound = req.body.currentRound || 0;
    var maxContestants = req.body.maxContestants || 1;
    var status = req.body.status || CONSTANTS.EVENT_STATUS.NOT_YET_STARTED;
    var pdf = req.body.pdf || "";

    models.Events.create({
      Name: name,
      Description: desc,
      Venue: venue,
      Start: start,
      End: end,
      CurrentRound: currentRound,
      MaxContestants: maxContestants,
      Status: status,
      pdf: pdf,
      CategoryId: categoryId,
      SocietyId: societyId
    })
    .then(function(data) {
      console.log("New event " + name + " is added");
      r.status = statusCodes.SUCCESS;
      r.data = "Event added successfully";
      res.end(r.toString());
    })
    .catch(function(e) {
      console.error(e.stack);
      r.status = statusCodes.SERVER_ERROR;
      r.data = e;
      res.end(r.toString());
    });
  }
});

module.exports = router;
