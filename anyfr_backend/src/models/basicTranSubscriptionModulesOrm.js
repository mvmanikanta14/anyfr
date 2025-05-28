const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  return sequelize.define('BasicTranSubscriptionModules', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    subscription_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'basic_tran_subscriptions',
        key: 'id'
      },
      onDelete: 'CASCADE',
      name: 'fk_subscription_id'  // Explicit foreign key name
    },
    module_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'basic_mast_modules',
        key: 'id'
      },
      onDelete: 'CASCADE',
      name: 'fk_module_id'  // Explicit foreign key name
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
    tableName: 'basic_tran_subscription_modules',
    freezeTableName: true,  // Prevents automatic pluralization
    underscored: true,      // Converts field names to snake_case
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ['subscription_id', 'module_id'],
    //     name: 'unique_subscription_module'
    //   },
    //   {
    //     name: 'idx_subscription_id',
    //     fields: ['subscription_id']
    //   },
    //   {
    //     name: 'idx_module_id',
    //     fields: ['module_id']
    //   }
    // ]
  });
};
