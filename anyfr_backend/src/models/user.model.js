const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  return sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_login_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'unique_name_index',
      validate: {
        notEmpty: { msg: 'Username cannot be empty' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'unique_email_index',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',  // Ensures column is created with correct casing
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',  // Ensures column is created with correct casing
    }
  }, { 
    tableName: 'Users',  
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['user_login_id'],
        name: 'unique_user_login_id_index',
      },
      {
        unique: true,
        fields: ['email'],
        name: 'unique_email_index',
      }
    ],
  });
};
