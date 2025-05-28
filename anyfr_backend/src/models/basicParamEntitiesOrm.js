const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  

  // Define the model
  const BasicParamEntities = sequelize.define('BasicParamEntities', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    entity_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: 'unique_entity_name_constraint'
    },
    entity_pan: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: 'unique_entity_pan_constraint'
    },
    entity_tan: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: 'unique_entity_tan_constraint'
    },
    entity_cin: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: 'unique_entity_cin_constraint'
    },
    reporting_frequency: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: {
        isIn: [['Monthly', 'Quarterly', 'Half-Yearly', 'Yearly']]
      }
    },
    financial_year_style: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: {
        isIn: [['Calendar Year', 'Financial Year']]
      }
    },
    reporting_period: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: {
        isIn: {
          args: [['2024-25', '2025-26', '2026-27']],
          msg: "Invalid period value. Allowed values are: '2024-25', '2025-26', '2026-27'."
        }
      }
    },
    financial_framework_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
       comment: 'Fk:fss_mast_frameworks.id'
    },
    is_cfs_applicable: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    // subscriber_id: {
    //   type: DataTypes.BIGINT,
    //   allowNull: true
    // },
    organisation_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Fk:basic_mast_users.id'
    },
    created_on: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    start_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: new Date().getFullYear()
    },
    end_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: new Date().getFullYear() + 1
    }
  }, {
    timestamps: false,
    tableName: 'basic_param_entities',
    freezeTableName: true,
    underscored: true
  });

  // ✅ Ensure table is created first before checking columns
  // await BasicParamEntities.sync({ alter: true });

  // // ✅ Check if the columns exist before altering
  // const tableDesc = await sequelize.getQueryInterface().describeTable('basic_param_entities')
  //   .catch(() => {
  //     console.log('⚠️ Table "basic_param_entities" not found, skipping describeTable check.');
  //     return null;
  //   });

  // if (tableDesc) {
  //   // Handle "created_by" column dynamically
  //   if (!tableDesc['created_by']) {
  //     console.log('➕ Adding column "created_by"');
  //     await sequelize.getQueryInterface().addColumn('basic_param_entities', 'created_by', {
  //       type: DataTypes.INTEGER,
  //       allowNull: true,
  //       references: {
  //         model: 'basic_mast_users',
  //         key: 'id'
  //       },
  //       onDelete: 'SET NULL'
  //     });
  //   } else {
  //     console.log('✅ Column "created_by" already exists, skipping...');
  //   }

  //   // Handle "financial_framework_id" column dynamically
  //   if (!tableDesc['financial_framework_id']) {
  //     console.log('➕ Adding column "financial_framework_id"');
  //     await sequelize.getQueryInterface().addColumn('basic_param_entities', 'financial_framework_id', {
  //       type: DataTypes.INTEGER,
  //       allowNull: true,
  //       references: {
  //         model: 'basic_mast_financial_framework',
  //         key: 'id'
  //       },
  //       onDelete: 'SET NULL'
  //     });
  //   } else {
  //     console.log('✅ Column "financial_framework_id" already exists, skipping...');
  //   }
  // }

  return BasicParamEntities;
};
