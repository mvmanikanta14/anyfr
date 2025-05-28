const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  // Define the model
  const ParamsEntityGroupDetails = sequelize.define('ParamsEntityGroupDetails', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'basic_param_entity_groups',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    parent_entity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'basic_param_entities',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    child_entity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'basic_param_entities',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    relationship_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: [['Holding-Subsidiary', 'Joint Venture', 'Associate', 'Branch']]
      }
    }
  }, {
    timestamps: false,
    tableName: 'params_entity_group_details'
  });

  // ✅ Ensure table exists before checking columns
  await ParamsEntityGroupDetails.sync({ alter: true });

  // ✅ Check table schema before altering
  const tableDesc = await sequelize.getQueryInterface().describeTable('params_entity_group_details')
    .catch(() => {
      console.log('⚠️ Table "params_entity_group_details" not found, skipping describeTable check.');
      return null;
    });

  if (tableDesc) {
    // Check if foreign key columns exist before altering
    const fkColumns = ['group_id', 'parent_entity_id', 'child_entity_id'];
    for (const column of fkColumns) {
      if (!tableDesc[column]) {
        console.log(`➕ Adding column "${column}"`);
        await sequelize.getQueryInterface().addColumn('params_entity_group_details', column, {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: column === 'group_id' ? 'basic_param_entity_groups' : 'basic_param_entities',
            key: 'id'
          },
          onDelete: 'CASCADE'
        });
      } else {
        console.log(`✅ Column "${column}" already exists, skipping...`);
      }
    }

    // ✅ Check if unique index exists before creating
    const indexes = await sequelize.getQueryInterface().showIndex('params_entity_group_details');
    const indexExists = indexes.some(index => index.name === 'unique_group_parent_child');

    if (!indexExists) {
      console.log('➕ Adding unique index on (group_id, parent_entity_id, child_entity_id)');
      await sequelize.getQueryInterface().addIndex('params_entity_group_details', {
        name: 'unique_group_parent_child',
        unique: true,
        fields: ['group_id', 'parent_entity_id', 'child_entity_id']
      });
    } else {
      console.log('✅ Index "unique_group_parent_child" already exists, skipping...');
    }
  }

  return ParamsEntityGroupDetails;
};
