module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    Name: DataTypes.STRING
  }, {
    timestamps: false,
    tableName: 'Category',
    freezeTableName: true
  },{
    Indexes: [
      { type: 'FULLTEXT', fields: ['Name'] }
    ]
  }, {
    classMethods: {
      associate: function(models) {
        Category.hasMany(models.Events);
      }
    }
  });
  return Category;
};
