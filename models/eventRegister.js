"use strict";

module.exports = function(sequelize, DataTypes) {
  var EventRegister = sequelize.define("EventRegister", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      notNull: true
    },
    eventId: {
      type: DataTypes.INTEGER,
      notNull: true
    }
  }, {
    timestamps: false
  });
  return EventRegister;
};
