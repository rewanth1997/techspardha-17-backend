module.exports = function(sequelize, DataTypes) {
  var StudentDetails = sequelize.define("StudentDetails", { 
    RollNO:{
      type: DataTypes.INTEGER,           //insertion of id and foreign key in the tables
      notNull: true
     },
    PhoneNumber: {
      type: DataTypes.STRING,
      notNull: true
    },
    Branch: {
      type: DataTypes.STRING,
      notNull: true
    },
    Year: {
      type: DataTypes.STRING,
      notNull: true
    },
    College: {
      type: DataTypes.STRING,
      notNull: true
    },
    Gender:{
      type: DataTypes.STRING,
      notNull: true
    }     
   
  }, {
    timestamps:false,
    classMethods
  });
  return StudentDetails;
};
