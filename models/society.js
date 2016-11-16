module.exports = function(sequelize, DataTypes) {
  var Society = sequelize.define("Society", {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Society.hasMany(models.Events);
      }
    }
  });

  return Society;
};
