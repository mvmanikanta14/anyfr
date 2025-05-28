const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    if (!sequelize) {
        throw new Error('Sequelize instance is required');
    }

    return sequelize.define('FssMastUnitsOfMeasurement', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        unit_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: {
                name: 'unique_unit_name_constraint',
                msg: 'Unit name must be unique'
            }
        },
        unit_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'fss_mast_unit_types',
                key: 'id'
            },
            onDelete: 'CASCADE',
            name: 'fk_unit_type_id'
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
        tableName: 'fss_mast_units_of_measurement',
        freezeTableName: true,  // Prevents automatic pluralization
        underscored: true,      // Converts column names to snake_case
        // indexes: [
        //     {
        //         unique: true,
        //         fields: ['unit_name'],
        //         name: 'unique_unit_name'
        //     },
        //     {
        //         name: 'idx_unit_type_id',
        //         fields: ['unit_type_id']
        //     },
        //     {
        //         name: 'idx_is_active',
        //         fields: ['is_active']
        //     }
        // ]
    });
};
