const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  return sequelize.define('BasicTranSubscriptions', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    license_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: {
        name: 'unique_license_id_constraint',
        msg: 'License ID must be unique'
      }
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    no_of_users: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    max_mass_storage: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    max_db_storage: {
      type: DataTypes.DECIMAL,
      allowNull: false
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
      onDelete: 'SET NULL',
      name: 'fk_created_by'  // Explicit foreign key name
    },
    created_on: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    tableName: 'basic_tran_subscriptions',
    freezeTableName: true,  // Prevents automatic pluralization
    underscored: true,      // Converts column names to snake_case
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ['license_id'],
    //     name: 'unique_license_id'
    //   },
    //   {
    //     name: 'idx_start_date',
    //     fields: ['start_date']
    //   },
    //   {
    //     name: 'idx_end_date',
    //     fields: ['end_date']
    //   }
    // ]
  });
};
