
module.exports = function(sequelize, DataTypes) {
  var Students = sequelize.define("Students", {
    Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true ,
    },
    Name: {
      type:DataTypes.STRING,
      allowNull: false
    } ,
    Email: {
      type:DataTypes.STRING,
      allowNull: false
    } ,
  }, {
    timestamps:false,
    classMethods: {
      associate:function(models) {
        Students.hasOne(models.StudentDetails,{foreignKey:'Id', as: 'Details'});
        Students.hasMany(models.Interests);
        Students.hasMany(models.UsersNotifications);
        Students.hasMany(models.TeamInvites);
        Students.hasMany(models.WishList);
      }
    },
    indexes: [
      {
        type: 'FULLTEXT',name: 'search_user_name_ft', fields: ['Name']
      }
    ]
  });
  return Students;
};
