const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    if (!sequelize) {
        throw new Error('Sequelize instance is required');
    }

    return sequelize.define('FssMastUnitTypes', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        unit_type_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: {
                name: 'unique_unit_type_name_constraint',
                msg: 'Unit type name must be unique'
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
        tableName: 'fss_mast_unit_types',
        freezeTableName: true,  // Prevents automatic pluralization
        underscored: true,      // Converts column names to snake_case
        // indexes: [
        //     {
        //         unique: true,
        //         fields: ['unit_type_name'],
        //         name: 'unique_unit_type_name'
        //     },
        //     {
        //         name: 'idx_is_active',
        //         fields: ['is_active']
        //     }
        // ]
    });
};
