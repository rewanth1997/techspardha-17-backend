
module.exports = function(sequelize, DataTypes) {
  var GuestLectures = sequelize.define("GuestLecture", {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Start: {
    	type: DataTypes.DATE,
    	allowNull: true
    },
    End: {
    	type: DataTypes.DATE,
    	allowNull: true
    },
    Photo: {
    	type: DataTypes.STRING,
    	allowNull: true
    },
    Description: {
    	type: DataTypes.TEXT,
		  allowNull: true
    },
    GuestName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Venue: {
    	type: DataTypes.STRING,
    	allowNull: true
    }
  },
  {
    timestamps: false,
    ClassMethods: {
      associate: function(models) {
        GuestLectures.hasMany(models.WishList);
      }
    },
    indexes: [
      {
        type: 'FULLTEXT',name: 'search_idx', fields: ['Description','GuestName']
      }
    ]
  });
  return GuestLectures;
};
