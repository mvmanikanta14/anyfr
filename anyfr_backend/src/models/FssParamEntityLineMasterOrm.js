const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    if (!sequelize) {
        throw new Error('Sequelize instance is required');
    }

    return sequelize.define('FssParamEntityLineMaster', {
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
        framework_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'fss_mast_financial_framework',  // Assuming this is the related model
                key: 'id'
            },
            onDelete: 'CASCADE',
            name: 'fk_framework_id'
        },
        fss_line_master_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'fss_mast_line_master',  // Assuming this is the related model
                key: 'id'
            },
            onDelete: 'CASCADE',
            name: 'fk_fss_line_master_id'
        },
        custom_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        is_added: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_hidden: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
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
        tableName: 'fss_param_entity_line_master',
        freezeTableName: true,  // Prevents automatic pluralization
        underscored: true,      // Ensures column names are snake_case
        uniqueKeys: {
            unique_entity_line_mapping: {
                fields: ['entity_id', 'fss_line_master_id']
            }
        },
        // indexes: [
        //     {
        //         name: 'idx_entity_id',
        //         fields: ['entity_id']
        //     },
        //     {
        //         name: 'idx_framework_id',
        //         fields: ['framework_id']
        //     },
        //     {
        //         name: 'idx_fss_line_master_id',
        //         fields: ['fss_line_master_id']
        //     },
        //     {
        //         name: 'idx_created_by',
        //         fields: ['created_by']
        //     }
        // ]
    });
};
