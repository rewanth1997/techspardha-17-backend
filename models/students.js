"use strict";

module.exports = function (sequelize, Datatypes) {
	var Students = sequelize.define("Students", {
		Name: {
		  type: Datatypes.STRING,
		},
		Email: {
			type: Datatypes.STRING,
			notNull: true,
			unique: true
		}
	}, {
		classMethods: {
			associate: function(models) {
				Students.hasMany(models.TeamInvites);
				Students.hasMany(models.TeamUsers);
			}
		}
	});
	return Students;
}