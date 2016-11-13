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
        TeamInvites.belongsTo(models.Teams, {foreignKey: 'TeamId'});
        TeamInvites.belongsTo(models.Students, {foreignKey: 'StudentId'});
      }
    }
  });
  return TeamInvites;
}
