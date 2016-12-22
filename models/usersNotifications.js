module.exports = function(sequelize, DataTypes) {
  var UsersNotifications = sequelize.define("UsersNotifications", {
    Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true ,
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps:false,
    classMethods: {
      associate:function(models) {
        UsersNotifications.belongsTo(models.Notifications);
        UsersNotifications.belongsTo(models.Students);
      }
    }
  });
  return UsersNotifications;
};
