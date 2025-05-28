const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  return sequelize.define('FssParamOeMappingGlFsli', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    entity_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'basic_param_entities',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    period_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'basic_param_reporting_period',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    fsli_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'fss_param_oe_mapping_gl_fsli',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    polarity: {
      type: DataTypes.STRING(3),
      allowNull: false,
      validate: {
        isIn: [['+ve', '-ve']]
      }
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true, // or false, based on your requirements
      comment: 'Amount with up to 15 digits, 2 decimals'
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
      onDelete: 'SET NULL'
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: true
    },
    organisation_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'fss_param_oep_rectification',
    freezeTableName: true,
    underscored: true
  });
};
