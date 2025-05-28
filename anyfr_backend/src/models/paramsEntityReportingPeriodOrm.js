const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  // Define the model
  const ParamsEntityReportingPeriod = sequelize.define('ParamsEntityReportingPeriod', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    entity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'basic_param_entities',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    reporting_year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    period_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'params_entity_reporting_period'
  });

  // ✅ Ensure table exists before checking columns
  await ParamsEntityReportingPeriod.sync({ alter: true });

  // ✅ Check table schema before altering
  const tableDesc = await sequelize.getQueryInterface().describeTable('params_entity_reporting_period')
    .catch(() => {
      console.log('⚠️ Table "params_entity_reporting_period" not found, skipping describeTable check.');
      return null;
    });

  if (tableDesc) {
    // Check if foreign key column exists before altering
    if (!tableDesc['entity_id']) {
      console.log('➕ Adding column "entity_id"');
      await sequelize.getQueryInterface().addColumn('params_entity_reporting_period', 'entity_id', {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'basic_param_entities',
          key: 'id'
        },
        onDelete: 'CASCADE'
      });
    } else {
      console.log('✅ Column "entity_id" already exists, skipping...');
    }

    // ✅ Check if unique index exists before creating
    const indexes = await sequelize.getQueryInterface().showIndex('params_entity_reporting_period');
    const indexExists = indexes.some(index => index.name === 'unique_entity_reporting_period');

    if (!indexExists) {
      console.log('➕ Adding unique index on (entity_id, reporting_year, period_name)');
      await sequelize.getQueryInterface().addIndex('params_entity_reporting_period', {
        name: 'unique_entity_reporting_period',
        unique: true,
        fields: ['entity_id', 'reporting_year', 'period_name']
      });
    } else {
      console.log('✅ Index "unique_entity_reporting_period" already exists, skipping...');
    }
  }

  return ParamsEntityReportingPeriod;
};
