module.exports = function(sequelize, DataTypes) {
  var EventRegister = sequelize.define("EventRegister", {
    Id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: true
    },
    EventId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CurrentRound: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        EventRegister.belongsTo(models.Students);
        EventRegister.belongsTo(models.Events);
        EventRegister.belongsTo(models.Teams);
      }
    }
  });
  return EventRegister;
};
