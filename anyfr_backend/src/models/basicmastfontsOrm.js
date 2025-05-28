const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  return sequelize.define('BasicMasterFont', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    font_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        name: 'unique_font_name_constraint',
        msg: 'Font name must be unique'
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: false, // No created_at and updated_at needed
    tableName: 'basic_mast_fonts',
    freezeTableName: true, // Prevents automatic pluralization
    underscored: true, // Converts field names to snake_case in DB
    // indexes: [
    //   {
    //     name: 'idx_font_name', // Add index for faster searches
    //     fields: ['font_name']
    //   }
    // ],
    defaultScope: {
      attributes: { exclude: ['created_by', 'created_on'] } // Hide metadata by default
    }
  });
};
