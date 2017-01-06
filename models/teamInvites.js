module.exports = function(sequelize, DataTypes) {
  var TeamInvites = sequelize.define("TeamInvites", {
    Id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
    Status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
      timestamps: false,
      classMethods: {
      associate: function(models) {
        TeamInvites.belongsTo(models.Teams);
        TeamInvites.belongsTo(models.Students, {as: 'Student'});
      }
    }
  });
  return TeamInvites;
};
