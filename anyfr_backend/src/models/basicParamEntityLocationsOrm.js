const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  return sequelize.define('BasicParamEntityLocations', {
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
    location_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        name: 'unique_location_name_constraint',
        msg: 'Location name must be unique for the entity'
      }
    },
    location_type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [['Location', 'Unit', 'Department']]
      }
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    pincode: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'basic_param_entity_locations',
    freezeTableName: true,  // Prevents automatic pluralization
    underscored: true,      // Converts field names to snake_case in the DB
    // indexes: [
    //   {
    //     name: 'idx_entity_id',  // Index on entity_id for optimization
    //     fields: ['entity_id']
    //   },
    //   {
    //     name: 'idx_location_name',  // Index on location_name for faster lookups
    //     fields: ['location_name']
    //   },
    //   {
    //     name: 'idx_pincode',  // Index on pincode for quicker access
    //     fields: ['pincode']
    //   }
    // ]
  });
};
