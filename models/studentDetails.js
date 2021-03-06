module.exports = function(sequelize, DataTypes) {
  var StudentDetails = sequelize.define("StudentDetails", {
    RollNo:{
      type: DataTypes.INTEGER,           //insertion of id and foreign key in the tables
      allowNull: false

     },
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Branch: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Year: {
      type: DataTypes.STRING,
      allowNull: false
    },
    College: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    IsNew: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps:false,
    classMethods: {
      associate:function(models) {
        StudentDetails.removeAttribute('id');
        StudentDetails.belongsTo(models.Students,{
          foreignKey:'Id',
          as: 'Profile'
        });
      }

    },
    indexes: [
      {
        type: 'FULLTEXT',name: 'search_user_phone_ft', fields: ['PhoneNumber']
      }
    ]
  });
  return StudentDetails;
};
