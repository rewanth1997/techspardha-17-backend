module.exports = function(sequelize, DataTypes) {
  var Interests = sequelize.define("Interests", {
    Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true ,
    },
  }, {
    timestamps:false,
    classMethods: {
      associate:function(models) {
        Interests.belongsTo(models.Category);
        Interests.belongsTo(models.Students);

    }
  }
  });
  return Interests;
};
