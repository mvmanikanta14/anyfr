const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    if (!sequelize) {
        throw new Error('Sequelize instance is required');
    }

    return sequelize.define('FssParamEntityGls', {
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
        gl_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        gl_code: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: {
                name: 'unique_gl_code_constraint',
                msg: 'GL code must be unique'
            }
        },
        falling_under: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'fss_param_entity_gls',  // Assuming this is a self-referencing field
                key: 'id'
            },
            onDelete: 'SET NULL',
            name: 'fk_falling_under'
        },
        mapped_to: {
            type: DataTypes.INTEGER(),
            allowNull: false
        },
        // mapped_to: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        //     references: {
        //         model: 'fss_param_entity_fs_structure',  // Assuming this is the related model
        //         key: 'id'
        //     },
        //     onDelete: 'SET NULL',
        //     name: 'fk_mapped_to'
        // },
        is_party: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        has_subsidiary: {
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
        tableName: 'fss_param_entity_gls',
        freezeTableName: true,  // Prevents automatic pluralization
        underscored: true,      // Ensures column names are snake_case
        uniqueKeys: {
            unique_entity_gl_code: {
                fields: ['entity_id', 'gl_code']
            }
        },
        // indexes: [
        //     {
        //         name: 'idx_entity_id',
        //         fields: ['entity_id']
        //     },
        //     {
        //         name: 'idx_falling_under',
        //         fields: ['falling_under']
        //     },
        //     {
        //         name: 'idx_mapped_to',
        //         fields: ['mapped_to']
        //     },
        //     {
        //         name: 'idx_created_by',
        //         fields: ['created_by']
        //     }
        // ]
    });
};
