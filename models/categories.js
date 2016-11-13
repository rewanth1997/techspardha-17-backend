"use strict";

module.exports = function(sequelize, DataTypes) {
  var Categories = sequelize.define("Categories", {
    Name: DataTypes.STRING
  }, {
  });

  return Categories;
};
