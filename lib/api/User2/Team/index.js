var express = require('express');
var router = express.Router();

var invite = require('./invite');

router.delete('/:teamId', function(req, res, next) {

  var r = new Response();

  if(req.user === undefined) {
    r.status = statusCodes.INVALID_TOKEN;
    return res.json(r);
  }

  var teamId = req.params.teamId;

  Model.Teams.findAll({
    attributes: ['Id'],
    where: {
      Id: teamId,
      TeamLeaderId: teamLeaderId
    }
  }).then(function(data){
    if(data.length >= 1) {
      Model.Teams.destroy({
        where: {
          Id: teamId,
          TeamLeaderId: teamLeaderId
        }
      }).then(function(data) {
          r.status = statusCodes.SUCCESS;
          r.data = "Team deleted successfully";
          res.json(r);
      }).catch(function(err) {
        r.status = statusCodes.SERVER_ERROR;
        r.data = err;
        res.json(r);
      });
    }
    else {
      r.status = statusCodes.SERVER_ERROR;
      r.data = "Invalid Team Id";
      res.json(r);
    }
  }).catch(function(err){
    r.status = statusCodes.SERVER_ERROR;
    r.data = err;
    res.json(r);
  });

});

router.use('/', invite);

module.exports = router;
