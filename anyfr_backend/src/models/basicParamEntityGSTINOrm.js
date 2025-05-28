const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  return sequelize.define('BasicParamEntityGSTIN', {
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
    gstin: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: {
        name: 'unique_gstin_constraint',
        msg: 'GSTIN must be unique'
      }
    },
    gstin_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    authorised_signatory: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: {
        name: 'unique_email_constraint',
        msg: 'Email must be unique'
      }
    }
  }, {
    timestamps: false,
    tableName: 'basic_param_entity_gstin',
    freezeTableName: true,  // Prevents automatic pluralization
    underscored: true,      // Converts field names to snake_case in the DB
    // indexes: [
    //   {
    //     name: 'idx_gstin',  // Index on gstin for optimization
    //     fields: ['gstin']
    //   },
    //   {
    //     name: 'idx_email',  // Index on email for optimization
    //     fields: ['email']
    //   }
    // ]
  });
};
