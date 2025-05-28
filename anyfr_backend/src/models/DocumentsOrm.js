const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  // Define the model
  const Documents = sequelize.define('Documents', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    document_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    document_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    document_path: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'basic_mast_users',  // Adjust if using another table name
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    created_on: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    tableName: 'documents'
  });

  // ✅ Ensure table exists before checking columns
  await Documents.sync({ alter: true });

  // ✅ Check table schema before altering
  const tableDesc = await sequelize.getQueryInterface().describeTable('documents')
    .catch(() => {
      console.log('⚠️ Table "documents" not found, skipping describeTable check.');
      return null;
    });

  if (tableDesc) {
    // Check if foreign key column exists before altering
    if (!tableDesc.user_id) {
      console.log('➕ Adding column "user_id"');
      await sequelize.getQueryInterface().addColumn('documents', 'user_id', {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Adjust if using another table
          key: 'id'
        },
        onDelete: 'CASCADE'
      });
    } else {
      console.log('✅ Column "user_id" already exists, skipping...');
    }

    // ✅ Check if unique index exists before creating
    const indexes = await sequelize.getQueryInterface().showIndex('documents');
    const indexExists = indexes.some(index => index.name === 'unique_user_document_path');

    if (!indexExists) {
      console.log('➕ Adding unique index on (user_id, document_path)');
      await sequelize.getQueryInterface().addIndex('documents', {
        name: 'unique_user_document_path',
        unique: true,
        fields: ['user_id', 'document_path']
      });
    } else {
      console.log('✅ Index "unique_user_document_path" already exists, skipping...');
    }
  }

  return Documents;
};
