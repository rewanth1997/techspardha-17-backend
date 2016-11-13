

module.exports = function(sequelize, DataTypes) {
  var student = sequelize.define("student", {        
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true ,
    },
    name: DataTypes.STRING,
    email:DataTypes.STRING
  }, {
    timestamps:false
  });
  return student;
};
