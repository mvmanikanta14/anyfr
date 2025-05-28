const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance is required');
  }

  return sequelize.define('BasicParamReportingStyle', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    entity_reporting_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
       comment: 'Fk:params_entity_reporting_period.id'
    },
    entity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Fk:basic_param_entities.id'
    },
    reporting_period_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
       comment: 'Fk:params_entity_reporting_period.id'
    },
    rounding_off: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'Lakhs',
      validate: {
        isIn: [['Rs', 'Thousands', 'Lakhs', 'Millions', 'Crores', 'Billions']]
      }
    },
    decimals: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
      validate: {
        min: 0,
        max: 3
      }
    },
    comma_style: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isIn: [[1, 2]] // 1 = Indian, 2 = American
      }
    },
    current_year_position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isIn: [[1, 2]] // 1 = Left, 2 = Right
      }
    },
    font_family_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
       comment: 'Fk:basic_mast_fonts.id'
    },
    font_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
      validate: {
        isIn: [[1, 2, 3]] // 1 = Small, 2 = Medium, 3 = Large
      }
    },
    note_level_1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 5
      }
    },
    note_level_2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 5
      }
    },
    note_level_3: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 5
      }
    },
    note_level_4: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 5
      }
    },
    footnote_style: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 7
      }
    },
    border_style: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 6
      }
    }
  }, {
    timestamps: false,
    tableName: 'basic_param_reporting_style',
    freezeTableName: true,  // Prevents automatic pluralization
    underscored: true,      // Converts field names to snake_case in DB
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ['entity_reporting_id']
    //   },
    //   {
    //     name: 'idx_entity_id',
    //     fields: ['entity_id']
    //   },
    //   {
    //     name: 'idx_reporting_period_id',
    //     fields: ['reporting_period_id']
    //   }
    // ]
  });
};
