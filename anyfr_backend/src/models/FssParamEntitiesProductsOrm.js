const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    if (!sequelize) {
        throw new Error('Sequelize instance is required');
    }

    return sequelize.define('FssParamEntitiesProducts', {
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
        product_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: {
                name: 'unique_product_name_constraint',
                msg: 'Product name must be unique'
            }
        },
        unit_type_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'fss_mast_unit_types',  // Assuming this is the related model
                key: 'id'
            },
            onDelete: 'CASCADE',
            name: 'fk_unit_type_id'
        },
        unit_of_measurement_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'fss_mast_units_of_measurement',  // Assuming this is the related model
                key: 'id'
            },
            onDelete: 'CASCADE',
            name: 'fk_unit_of_measurement_id'
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
        tableName: 'fss_param_entities_products',
        freezeTableName: true,  // Prevents automatic pluralization
        underscored: true,      // Ensures column names are snake_case
        // indexes: [
        //     {
        //         unique: true,
        //         fields: ['product_name'],
        //         name: 'unique_product_name'
        //     },
        //     {
        //         name: 'idx_entity_id',
        //         fields: ['entity_id']
        //     },
        //     {
        //         name: 'idx_unit_type_id',
        //         fields: ['unit_type_id']
        //     },
        //     {
        //         name: 'idx_unit_of_measurement_id',
        //         fields: ['unit_of_measurement_id']
        //     }
        // ]
    });
};
