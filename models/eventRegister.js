module.exports = function(sequelize, DataTypes) {
  var EventRegister = sequelize.define("EventRegister", {
    Id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      notNull: true
    },
    EventId: {
      type: DataTypes.INTEGER,
      notNull: true
    },
    CurrentRound: {
      type: DataTypes.INTEGER,
      notNull: true
    }
  }, {
    timestamps: false
  });
  return EventRegister;
};
