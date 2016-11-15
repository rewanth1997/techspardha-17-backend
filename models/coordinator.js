module.exports = function(sequelize, DataTypes) {
  var Coordinators = sequelize.define("Coordinators", {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Name: DataTypes.STRING,
    Username: DataTypes.STRING,
    Email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    Password: DataTypes.STRING,
    PhoneNo: DataTypes.BIGINT
  }, {
  });

  return Coordinators;
};
