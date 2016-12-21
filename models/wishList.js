
module.exports = function(sequelize, DataTypes) {
  var WishList = sequelize.define("WishList", {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    LectureId: DataTypes.INTEGER
  }, {
    timestamps: false,
    ClassMethods: {
      associate: function(models) {
        WishList.belongsTo(models.Students);
      }
    }
  });
  return WishList;
};
