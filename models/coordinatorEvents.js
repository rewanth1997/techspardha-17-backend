module.exports = function(sequelize, DataTypes) {
  var CoordinatorEvents = sequelize.define("CoordinatorEvents", {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        CoordinatorEvents.belongsTo(models.Events);
        CoordinatorEvents.belongsTo(models.Coordinators);
      }
    }
  });

  return CoordinatorEvents;
};
