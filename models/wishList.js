
module.exports = function(sequelize, DataTypes) {
  var WishList = sequelize.define("GuestLectures", {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    LectureId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    StudentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
    ClassMethods: {
      associate: function(models) {
        //Someone please make LectureId & StudentId as a foreign key
        //I don't remember how to make a foreign key
      }
    }
  });
  return WishList;
};
