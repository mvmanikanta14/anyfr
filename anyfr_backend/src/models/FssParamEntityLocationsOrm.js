const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    if (!sequelize) {
        throw new Error('Sequelize instance is required');
    }

    return sequelize.define('FssParamEntityLocations', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        // entity_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        //     references: {
        //         model: 'basic_param_entities',  // Assuming this is the related model
        //         key: 'id'
        //     },
        //     onDelete: 'CASCADE',
        //     name: 'fk_entity_id'
        // },
        location_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: {
                name: 'unique_location_name_constraint',
                msg: 'Location name must be unique'
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
                model: 'basic_mast_users',  // Assuming this is the related model
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
        tableName: 'fss_param_entity_locations',
        freezeTableName: true,  // Prevents automatic pluralization
        underscored: true,      // Ensures column names are snake_case
        // indexes: [
        //     {
        //         unique: true,
        //         fields: ['location_name'],
        //         name: 'unique_location_name'
        //     },
        //     {
        //         name: 'idx_entity_id',
        //         fields: ['entity_id']
        //     },
        //     {
        //         name: 'idx_created_by',
        //         fields: ['created_by']
        //     }
        // ]
    });
};
