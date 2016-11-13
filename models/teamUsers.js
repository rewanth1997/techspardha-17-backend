"use strict";

module.exports = function(sequelize, Datatypes) {
	var TeamUsers = sequelize.define("TeamUsers", {
		TeamId: {
			type: Datatypes.INTEGER
		},
		StudentId: {
			type: Datatypes.INTEGER
		},
		EventId: {
			type: Datatypes.INTEGER
		}
	}, {
		classMethods: {
			associate: function(models) {
				TeamUsers.belongsTo(models.Teams, {foreignKey: 'TeamId'});
				TeamUsers.belongsTo(models.Students, {foreignKey: 'StudentId'});
				TeamUsers.belongsTo(models.Events, {foreignKey: 'EventsId'});
				
			}
		}
	});
	return TeamUsers;
}