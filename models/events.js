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
    Start: {
      type: DataTypes.DATE,
      allowNull: true
    },
    End: {
      type: DataTypes.DATE,
      allowNull: true
    },
    CurrentRound: {
      type: DataTypes.INTEGER,
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
        Events.belongsTo(models.Society);
        Events.belongsTo(models.Category);
        Events.hasMany(models.Teams);
      }
    },
    indexes: [
      {
        type: 'FULLTEXT',name: 'search_idx', fields: ['Description','Name']
      }
    ]
  });
  return Events;
};
