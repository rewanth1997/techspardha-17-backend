"use strict";

module.exports = function(sequelize, DataTypes) {
  var events = sequelize.define("events", {        //Must be same as table name
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    name: {
      type: DataTypes.STRING,
      notNull: true
    },
    description: {
      type: DataTypes.STRING,
      notNull: true
    },
    venue: {
      type: DataTypes.STRING,
      notNull: true
    },
    startTime: {
      type: DataTypes.STRING,
      notNull: true
    },
    endTime: {
      type: DataTypes.STRING,
      notNull: true
    },
    startDate: {
      type: DataTypes.STRING,
      notNull: true
    },
    endDate: {
      type: DataTypes.STRING,
      notNull: true
    },
    currentRound: {
      type: DataTypes.STRING,
      notNull: true
    },
    society: {
      type: DataTypes.STRING,
      notNull: true
    },
    category: {
      type: DataTypes.STRING,
      notNull: true
    },
    maxContestants: {
      type: DataTypes.INTEGER,
      notNull: true
    },
    status: {
      type: DataTypes.STRING,
      notNull: true
    },
    pdf: {
      type: DataTypes.STRING,
      notNull: true
    }
  }, {
    timestamps: false
  });
  return events;
};
