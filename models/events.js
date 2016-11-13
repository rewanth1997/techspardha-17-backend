(function () {
   'use strict';
   module.exports = function(sequelize, DataTypes) {
     var Events = sequelize.define("Events", {        //Must be same as table name
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
       classMethods: {
         associate: function(models) {
           Events.belongsTo(models.Category);
         }
       },
       indexes: [
         {
           type: 'FULLTEXT',name: 'search_idx', fields: ['Description','Name','Society']
         }
       ]
     });
     return Events;
   };
}());
