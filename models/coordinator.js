module.exports = function(sequelize, DataTypes) {
  var Coordinator = sequelize.define("Coordinator", {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNo: DataTypes.BIGINT
  }, {
  });

  return Coordinator;
};
