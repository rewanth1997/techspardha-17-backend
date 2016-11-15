module.exports = function(sequelize, DataTypes) {
	var Teams = sequelize.define("Teams", {
		Id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		Name: {
			type: DataTypes.STRING,
			notNull: true
		},
    CurrentRound: {
      type: DataTypes.INTEGER,
      notNull: true
    }
	}, {
		timestamps: false,
		classMethods: {
			associate: function(models) {
				Teams.belongsTo(models.Events, {as: 'Event'});
				Teams.hasMany(models.TeamInvites);
				Teams.belongsTo(models.Students, {as: 'TeamLeader'});
			}
		}
	});
	return Teams;
};
