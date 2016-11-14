module.exports = function(sequelize, DataTypes) {
  var Societies = sequelize.define("Societies", {
    name: DataTypes.STRING
  }, {
  });

  return Societies;
};
