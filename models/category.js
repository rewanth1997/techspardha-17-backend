
module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {        
    Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true ,
    },
    Name: {
      type:DataTypes.STRING,
      allowNull: false
    } 
  }, {
    timestamps:false,
    freezeTableName: true,
    classMethods: {
      associate:function(models) {
         Category.hasMany(models.Interests);
      }
   }
  });
  return Category;
};
