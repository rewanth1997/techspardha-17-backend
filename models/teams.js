"use strict";

module.exports = function(sequelize, Datatypes) {
	var Teams = sequelize.define("Teams", {
		Name: {
			type: Datatypes.STRING,
			notNull: true
		},
		EventId: {
			type: Datatypes.INTEGER,
			/*references: {
				model: 'events',
				key: 'id'	
			}*/
		},
		CurrentLevel: {
			type: Datatypes.INTEGER,
			notNull: true
		}
	}, {
		classMethods: {
			associate: function(models) {
				console.log(models);
				Teams.belongsTo(models.Events, {foreignKey: 'EventId'});
				Teams.hasMany(models.TeamInvites, {foreignKey: 'id'});
				Teams.hasMany(models.TeamUsers, {foreignKey: 'id'});
			}
		}
	});
	return Teams;
}