const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  return sequelize.define('BasicMastPeriods', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }, 

    period: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: {
        isIn: {
          args: [['AY 2024-25', 'AY 2025-26', 'AY 2026-27']],
          msg: "Invalid period value. Allowed values are: 'AY 2024-25', 'AY 2025-26', 'AY 2026-27'."
        }
      }
    }, 

    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
       comment: 'Fk:basic_mast_users.id'
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    created_on: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {
    timestamps: false,
    tableName: 'basic_mast_periods',
    freezeTableName: true,  
    underscored: true,       
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ['entity_reporting_id']
    //   },
    //   {
    //     name: 'idx_entity_id',
    //     fields: ['entity_id']
    //   },
    //   {
    //     name: 'idx_reporting_period_id',
    //     fields: ['reporting_period_id']
    //   }
    // ]
  });
};
