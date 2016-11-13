module.exports = function(sequelize, DataTypes) {
  var Interests = sequelize.define("Interests", { 
    StudentId: {
      type: DataTypes.INTEGER,           //insertion of id and foreign key in the tables
      allowNull: false
     },
    CategoryId: {
      type: DataTypes.INTEGER,           //insertion of id and foreign key in the tables
      allowNull: false
     }
   
  }, {
    timestamps:false,
    classMethods: {

    }
  });
  return Interests;
};
