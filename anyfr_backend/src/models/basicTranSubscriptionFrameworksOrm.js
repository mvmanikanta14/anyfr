const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  return sequelize.define('BasicTranSubscriptionFrameworks', {
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
    // framework_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'basic_mast_financial_framework',
    //     key: 'id'
    //   },
    //   onDelete: 'CASCADE',
    //   name: 'fk_framework_id'  // Explicit foreign key name
    // },
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
    tableName: 'basic_tran_subscription_frameworks',
    freezeTableName: true,  // Prevents automatic pluralization
    underscored: true,      // Converts field names to snake_case in DB
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ['subscription_id', 'framework_id']
    //   }
    // ]
  });
};
