module.exports = function(sequelize, DataTypes) {
  var Interests = sequelize.define("Interests", { 
    StudentId:{
      type: DataTypes.INTEGER,           //insertion of id and foreign key in the tables
      notNull: true
     },
    CategoryId:{
      type: DataTypes.INTEGER,           //insertion of id and foreign key in the tables
      notNull: true
     }
   
  }, {
    timestamps:false,
    classMethods
  });
  return Interests;
};
