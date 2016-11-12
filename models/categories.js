module.exports = function(sequelize, DataTypes) {
  var Categories = sequelize.define("Categories", {
    name: DataTypes.STRING
  }, {
  });

  return Categories;
};
