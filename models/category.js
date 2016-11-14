
module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {        
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Category.hasMany(models.Events);
        Category.hasMany(models.Interests);
      },
    indexes: [
      {
        type: 'FULLTEXT',name: 'search_idx', fields: ['Name']
      }
    ]
  }
  });
  return Category;
};
