const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  return sequelize.define('BasicMastModules', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    module_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        name: 'unique_module_name_constraint',
        msg: 'Module name must be unique'
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
       comment: 'Fk:basic_mast_users.id'
    },
    created_on: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    tableName: 'basic_mast_modules',
    freezeTableName: true,
    underscored: true,
    // indexes: [
    //   {
    //     name: 'idx_module_name',
    //     fields: ['module_name']
    //   }
    // ],
    defaultScope: {
      attributes: { exclude: ['created_by', 'created_on'] }
    }
  });
};
