"use strict";

module.exports = function(sequelize, Datatypes) {
	var TeamUsers = sequelize.define("TeamUsers", {
		TeamId: {
			type: Datatypes.INTEGER
		},
		StudentId: {
			type: Datatypes.INTEGER
		}
	}, {
		classMethods: {
			associate: function(models) {
				TeamUsers.belongsTo(models.Teams, {as: 'Team'});
				TeamUsers.belongsTo(models.Students, {as: 'Student'});
			}
		}
	});
	return TeamUsers;
}