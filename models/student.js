

module.exports = function(sequelize, DataTypes) {
  var student = sequelize.define("student", {        //Must be same as table name
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    name: DataTypes.STRING,
    email:DataTypes.STRING
  });
  return student;
};
