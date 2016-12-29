module.exports = function(sequelize, DataTypes) {
  var Notifications = sequelize.define("Notifications", {
    Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true ,
    },
    Message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    NotificationType: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps:true,
    classMethods: {
      associate:function(models) {
        Notifications.belongsTo(models.Events);
        Notifications.hasMany(models.UsersNotifications);
      }
    }
  });
  return Notifications;
};
