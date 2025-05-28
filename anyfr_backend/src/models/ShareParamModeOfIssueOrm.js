const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  return sequelize.define('ShareParamModeOfIssue', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    mode_of_issue_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        name: 'unique_mode_of_issue_name_constraint',
        msg: 'Mode of issue name must be unique'
      }
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
      name: 'fk_created_by'
    },
    created_on: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    tableName: 'share_param_mode_of_issues',
    freezeTableName: true,  // Prevents automatic pluralization
    underscored: true,      // Ensures column names are snake_case
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ['mode_of_issue_name'],
    //     name: 'unique_mode_of_issue_name'
    //   },
    //   {
    //     name: 'idx_is_active',
    //     fields: ['is_active']
    //   }
    // ]
  });
};
