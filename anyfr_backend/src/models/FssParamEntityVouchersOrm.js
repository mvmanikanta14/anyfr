const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    if (!sequelize) {
        throw new Error('Sequelize instance is required');
    }

    return sequelize.define('FssParamEntityVouchers', {
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
        custom_voucher_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: {
                name: 'unique_custom_voucher_name_constraint',
                msg: 'Custom voucher name must be unique'
            }
        },
        standard_voucher_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'fss_mast_voucher_types',  // Assuming this is the related model
                key: 'id'
            },
            onDelete: 'SET NULL',
            name: 'fk_standard_voucher_id'
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
        tableName: 'fss_param_entity_vouchers',
        freezeTableName: true,  // Prevents automatic pluralization
        underscored: true,      // Ensures column names are snake_case
        // indexes: [
        //     {
        //         unique: true,
        //         fields: ['custom_voucher_name'],
        //         name: 'unique_custom_voucher_name'
        //     },
        //     {
        //         name: 'idx_entity_id',
        //         fields: ['entity_id']
        //     },
        //     {
        //         name: 'idx_standard_voucher_id',
        //         fields: ['standard_voucher_id']
        //     },
        //     {
        //         name: 'idx_created_by',
        //         fields: ['created_by']
        //     }
        // ]
    });
};
