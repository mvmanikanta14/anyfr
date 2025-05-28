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
    gl_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    gl_code: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    falling_under: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'fss_param_oe_mapping_gl_fsli',
        key: 'id'
      },
      onDelete: 'SET NULL'
    },
    mappted_to_fsli_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_party: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    has_subsidiary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    }
  }, {
    timestamps: false,
    tableName: 'fss_param_oe_mapping_gl_fsli',
    freezeTableName: true,
    underscored: true
  });
};
