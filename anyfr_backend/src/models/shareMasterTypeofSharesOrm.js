const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  return sequelize.define('ShareMasterTypeOfShare', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type_of_share_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        name: 'unique_type_of_share_name_constraint',
        msg: 'Type of share name must be unique'
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'basic_mast_users',
        key: 'id'
      },
      onDelete: 'SET NULL',
      name: 'fk_created_by'  // Explicit foreign key name
    },
    created_on: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    tableName: 'share_master_type_of_shares',
    freezeTableName: true,  // Prevents automatic pluralization
    underscored: true,      // Ensures column names are in snake_case
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ['type_of_share_name'],
    //     name: 'unique_type_of_share_name'
    //   },
    //   {
    //     name: 'idx_is_active',
    //     fields: ['is_active']
    //   }
    // ]
  });
};
