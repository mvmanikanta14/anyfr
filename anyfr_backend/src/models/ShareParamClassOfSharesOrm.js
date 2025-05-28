const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  return sequelize.define('SharesParamClassOfShares', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    entity_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type_of_share_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_master_type_of_shares',
        key: 'id'
      },
      onDelete: 'CASCADE',
      name: 'fk_type_of_share_id'  // Explicit foreign key name
    },
    class_of_share_name: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    tableName: 'share_param_class_of_shares',
    freezeTableName: true,  // Prevents automatic pluralization
    underscored: true,      // Converts column names to snake_case
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ['class_of_share_name'],
    //     name: 'unique_class_of_share_name'
    //   },
    //   {
    //     name: 'idx_entity_id',
    //     fields: ['entity_id']
    //   }
    // ]
  });
};
