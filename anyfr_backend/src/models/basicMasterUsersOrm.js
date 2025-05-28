const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  return sequelize.define('BasicMasterUser', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    login_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        name: 'unique_login_id_constraint',
        msg: 'Login ID must be unique'
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: {
        name: 'unique_phone_constraint',
        msg: 'Phone number must be unique'
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        name: 'unique_email_constraint',
        msg: 'Email must be unique'
      },
      validate: {
        isEmail: true
      }
    },
    secret_question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    secret_answer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    display_picture: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    // subscriber_id: {
    //   type: DataTypes.BIGINT,
    //   allowNull: true
    // },
    organisation_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Fk:basic_mast_users.id'
    },
    created_on: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    tableName: 'basic_mast_users',
    freezeTableName: true,
    underscored: true,
    // indexes: [
    //   {
    //     name: 'idx_login_id',
    //     fields: ['login_id']
    //   },
    //   {
    //     name: 'idx_email',
    //     fields: ['email']
    //   },
    //   {
    //     name: 'idx_phone',
    //     fields: ['phone']
    //   }
    // ]
  });
};
