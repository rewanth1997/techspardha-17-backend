module.exports = function(sequelize, DataTypes) {
  var Coordinators = sequelize.define("Coordinators", {
    Name: DataTypes.STRING,
    Username: DataTypes.STRING,
    Password: DataTypes.STRING,
    PhoneNo: DataTypes.BIGINT
  }, {
  });

  return Coordinators;
};
