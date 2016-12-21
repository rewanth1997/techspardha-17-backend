
module.exports = function(sequelize, DataTypes) {
  var GuestLectures = sequelize.define("GuestLectures", {
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
    	type: DataTypes.STRING,
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
  }, {
    timestamps: false,
    indexes: [
      {
        type: 'FULLTEXT',name: 'search_idx', fields: ['Description','GuestName']
      }
    ]
  });
  return GuestLectures;
};
