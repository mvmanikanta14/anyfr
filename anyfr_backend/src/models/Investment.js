const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  return sequelize.define('Investment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_by: { type: DataTypes.INTEGER, allowNull: false }, // User ID who created the investment
    trade_or_other: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    nature_of_property: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    association_type: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    valuation_method: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    quoted_unquoted: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    investment_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    no_of_instruments: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    value_of_acquisition: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: false
    },
    current_year_amount: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: false
    }
}, {
    timestamps: true, // Enables created_at and updated_at fields
    tableName: 'investments' // Explicitly define table name
});
};
