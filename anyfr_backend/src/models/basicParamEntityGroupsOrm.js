const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  return sequelize.define('BasicParamEntityGroups', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    group_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        name: 'unique_group_name_constraint',
        msg: 'Group name must be unique'
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Fk:basic_mast_users.id' // Foreign key name
    },
    created_on: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    tableName: 'basic_param_entity_groups',
    freezeTableName: true, // Prevents automatic pluralization of table names
    underscored: true, // Converts field names to snake_case in DB
    // indexes: [
    //   {
    //     name: 'idx_group_name', // Index on group_name for optimization
    //     fields: ['group_name']
    //   }
    // ]
  });
};
