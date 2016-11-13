(function () {
   'use strict';
   module.exports = function(sequelize, DataTypes) {
     var Events = sequelize.define("Events", {        //Must be same as table name
       Id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true // Automatically gets converted to SERIAL for postgres
       },
       Name: {
         type: DataTypes.STRING,
         notNull: true
       },
       Description: {
         type: DataTypes.STRING,
         notNull: true
       },
       Venue: {
         type: DataTypes.STRING,
         notNull: true
       },
       StartTime: {
         type: DataTypes.STRING,
         notNull: true
       },
       EndTime: {
         type: DataTypes.STRING,
         notNull: true
       },
       StartDate: {
         type: DataTypes.STRING,
         notNull: true
       },
       EndDate: {
         type: DataTypes.STRING,
         notNull: true
       },
       CurrentRound: {
         type: DataTypes.STRING,
         notNull: true
       },
       Society: {
         type: DataTypes.STRING,
         notNull: true
       },
       CategoryId: {
         type: DataTypes.INTEGER,
         notNull: true
       },
       MaxContestants: {
         type: DataTypes.INTEGER,
         notNull: true
       },
       Status: {
         type: DataTypes.STRING,
         notNull: true
       },
       Pdf: {
         type: DataTypes.STRING,
         notNull: true
       }
     }, {
       timestamps: false,
       tableName: 'Events',
       freezeTableName: true
     }, {
       indexes: [
         { type: 'FULLTEXT', fields: 'name' }
       ]
     },{
       classMethods: {
         associate: function(models) {
           Events.belongsTo(models.Category);
         }
       }
     });
     return Events;
   };
}());
