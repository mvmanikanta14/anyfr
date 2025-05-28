const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  return sequelize.define('BasicParamEntityTAN', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    entity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
       comment: 'Fk:basic_param_entities.id'
    },
    tan_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: {
        name: 'unique_tan_number_constraint',
        msg: 'TAN number must be unique'
      }
    },
    concerned_officer: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'basic_param_entity_tan',
    freezeTableName: true,  // Prevents automatic pluralization
    underscored: true,      // Converts field names to snake_case in the DB
    // indexes: [
    //   {
    //     name: 'idx_tan_number',  // Index for faster lookups on tan_number
    //     fields: ['tan_number']
    //   },
    //   {
    //     name: 'idx_entity_id',  // Index for entity_id for better optimization
    //     fields: ['entity_id']
    //   }
    // ]
  });
};
