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
  console.log(query);
  if(query !== undefined ){
    models.Events.findAll({
      include: [
      {
        model: models.Category,
        attributes: []
      },
      {
        model: models.Society,
        attributes: []
      },
      {
        model: models.Coordinators,
        attributes: ['Name','PhoneNo', 'Email']
      }],
      attributes: {
        exclude: []
      },
      where: ['MATCH(Events.Name,Events.Description) AGAINST(?) or ' +
      'MATCH(Society.Name,Society.Description) AGAINST(?) or ' +
      'MATCH(Society.Name,Society.Description) AGAINST(?) or ' +
      'Events.Name like (?) or ' +
      'Society.Name like (?) or ' +
      'Category.Name like (?) ',
      query, query, query, '%'+query+'%', '%'+query+'%', '%'+query+'%']
    }).then(function(data) {
      r.status = statusCodes.SUCCESS;
      for(var i=0;i<data.length;i++) {
        for(var j=0;j<data[i].dataValues.Coordinators.length;j++) {
            delete(data[i].dataValues.Coordinators[j].dataValues.CoordinatorEvents);
        }
      }
      r.data = data;
      return res.json(r);
    }).catch(function(err){
      console.log(err);
      r.status = statusCodes.SERVER_ERROR;
      r.data = err;
      return res.json(r);
    });
  }
  else {
    models.Events.findAll({
      include: [
        {
          model: models.Coordinators,
          attributes: ['Name','PhoneNo', 'Email']
        }
      ]
    }).then(function(data) {

      r.status = statusCodes.SUCCESS;
      for(var i=0;i<data.length;i++) {
        for(var j=0;j<data[i].dataValues.Coordinators.length;j++) {
            delete(data[i].dataValues.Coordinators[j].dataValues.CoordinatorEvents);
        }
      }

      r.data = data;
      res.json(r);
    }).catch(function(err){
      r.status = statusCodes.SERVER_ERROR;
      r.data = err;
      return res.json(r);
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
    res.json(r);
  }
  else if(!categoryId) {
    r.status = statusCodes.BAD_INPUT;
    r.data = "Category ID is required parameter";
    res.json(r);
  }
  else if(!societyId) {
    r.status = statusCodes.BAD_INPUT;
    r.data = "Society ID is required parameter";
    res.json(r);
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
      Rules: req.body.rules,
      End: end,
      CurrentRound: currentRound,
      MaxContestants: maxContestants,
      TotalRounds: req.body.totalRounds,
      Status: status,
      pdf: pdf,
      CategoryId: categoryId,
      SocietyId: societyId
    })
    .then(function(data) {
      console.log('New event ' + name + ' is added');

      r.status = statusCodes.SUCCESS;
      r.data = 'Event added successfully';
      res.json(r);
      models.CoordinatorEvents.create( {
        EventId: data.dataValues.Id,
        CoordinatorId: req.user.id
      }).then(function(data) {
        console.log('New event mapped to coordinator');
      });
    })
    .catch(function(e) {
      console.error(e.stack);
      r.status = statusCodes.SERVER_ERROR;
      r.data = e;
      res.json(r);
    });
  }
});

module.exports = router;
