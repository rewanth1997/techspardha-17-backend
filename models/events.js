"use strict";

module.exports = function(sequelize, DataTypes) {
  var events = sequelize.define("events", {        //Must be same as table name
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    venue: DataTypes.STRING,
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    currentRound: DataTypes.STRING,
    society: DataTypes.STRING,
    category: DataTypes.STRING,
    maxContestants: DataTypes.INTEGER,
    status: DataTypes.STRING,
    pdf: DataTypes.STRING
  });
  return events;
};
