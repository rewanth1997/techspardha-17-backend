"use strict";

module.exports = function(sequelize, Datatypes) {
  var TeamInvites = sequelize.define("TeamInvites", {
    TeamId: {
		  type: Datatypes.INTEGER,
		  /*references: {
        model: 'teams',
        key: 'id'             
      }*/
    },
    StudentId: {
    	type: Datatypes.INTEGER,
    	/*references: {
        model: 'student',
        key: 'id'
      }*/
    }
  }, {
      classMethods: {
      associate: function(models) {
        TeamInvites.belongsTo(models.Teams, {as: 'Team'});
        TeamInvites.belongsTo(models.Students, {as: 'Student'});
      }
    }
  });
  return TeamInvites;
}
