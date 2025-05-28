const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  // Define the model for locations with user_id as a foreign key
  const GeoLocation = sequelize.define('GeoLocation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'basic_mast_users', // Reference your users table as per your ORM naming convention
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    created_on: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    timestamps: false,
    tableName: 'geo_locations'
  });

  // Ensure the table exists and is updated
  await GeoLocation.sync({ alter: true });

  return GeoLocation;
};
