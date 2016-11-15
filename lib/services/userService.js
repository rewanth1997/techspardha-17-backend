var models = require('../../models');

module.exports = {
  isAdmin: function(user) {
    models.Coordinators.findAll({
      where : {
        Email: user.email
      }
    }).then(function(data) {
      if(data.length === 1)
        return true;
    }).catch(function(error) {
      console.log("Error occured while checking for admin user " + error);
    });
  }
};
