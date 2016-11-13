
module.exports = function(sequelize, DataTypes) {
  var Students = sequelize.define("Students", {        
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true ,
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false
    } ,

    email: {
      type:DataTypes.STRING,
      allowNull: false
    } ,
  }, {
    timestamps:false,
    classMethods: {
      associate:function(models) {
        Students.hasOne(models.StudentDetails,{foreignKey:'id'})
      }
   }
  });
  return Students;
};
