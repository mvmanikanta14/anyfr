const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  return sequelize.define('BasicParamReportingPrint', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    entity_reporting_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Fk:params_entity_reporting_period.id' // Explicit name for the foreign key
    },
    entity_print_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        name: 'unique_entity_print_name_constraint',
        msg: 'Entity print name must be unique'
      }
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    place: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    print_date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    notice_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    board_meeting_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    agm_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    shorter_notice: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    audit_report_udin: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    icofar_udin: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    it_audit_udin: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    ca_signatories: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: []
    },
    entity_signatories: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: []
    }
  }, {
    timestamps: false,
    tableName: 'basic_param_reporting_print',
    freezeTableName: true,  // Prevents automatic pluralization
    underscored: true,      // Converts field names to snake_case in the DB
    // indexes: [
    //   {
    //     name: 'idx_entity_reporting_id',  // Index for faster lookups on entity_reporting_id
    //     fields: ['entity_reporting_id']
    //   },
    //   {
    //     name: 'idx_entity_print_name',  // Index on entity_print_name
    //     fields: ['entity_print_name']
    //   }
    // ]
  });
};
 