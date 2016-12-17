module.exports = function(sequelize, DataTypes) {
  var Society = sequelize.define("Society", {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Description: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Society.hasMany(models.Events);
      }
    },
    indexes: [
      {
        type: 'FULLTEXT',name: 'search_idx', fields: ['Description','Name']
      }
    ]
  });

  return Society;
};
