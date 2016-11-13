(function () {
   'use strict';
   module.exports = function(sequelize, DataTypes) {
     var Events = sequelize.define("Events", {
       Id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
       },
       Name: {
         type: DataTypes.STRING,
         allowNull: false
       },
       Description: {
         type: DataTypes.STRING,
         allowNull: false
       },
       Venue: {
         type: DataTypes.STRING,
         allowNull: true
       },
       StartTime: {
         type: DataTypes.STRING,
         allowNull: true
       },
       EndTime: {
         type: DataTypes.STRING,
         allowNull: true
       },
       StartDate: {
         type: DataTypes.STRING,
         allowNull: true
       },
       EndDate: {
         type: DataTypes.STRING,
         allowNull: true
       },
       CurrentRound: {
         type: DataTypes.STRING,
         allowNull: true
       },
       Society: {
         type: DataTypes.STRING,
         allowNull: true
       },
       MaxContestants: {
         type: DataTypes.INTEGER,
         allowNull: true
       },
       Status: {
         type: DataTypes.STRING,
         allowNull: true
       },
       Pdf: {
         type: DataTypes.STRING,
         allowNull: true
       }
     }, {
       timestamps: false,
       classMethods: {
         associate: function(models) {
           Events.belongsTo(models.Category);
           Events.hasMany(models.Teams);
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
