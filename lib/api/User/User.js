

/*

// Getting the details of the user like interests, phoneNo, rollNo.
router.post('/details',function(req, res, next){
  var username = req.body.username;
  var rollNo = req.body.rollNo;
  var phoneNo = req.body.phoneNo;
  var interests = req.body.interests;
  var stringOfInterests = "";
  for(var i=0; i<interests.length; i++){
    stringOfInterests += interests[i] + ',';
  }
  console.log(username + " " + rollNo + " " + phoneNo + " " + stringOfInterests);

  var detailsPromise = null;
  detailsPromise = new Model.Details({username: username}).fetch();

  detailsPromise.then(function(model) {
      if(model) {
         res.render('redirection',{title: 'Success', user: username});
      } else {
         var fillUserDetails = new Model.Details({username: username, rollNo: rollNo, phoneNo: phoneNo, interests: stringOfInterests});
         fillUserDetails.save().then(function(model) {
            res.render('redirection',{title: 'Success', user: username});
         });
      }
   });

});
*/
