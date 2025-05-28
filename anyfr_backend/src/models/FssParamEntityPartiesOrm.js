const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    if (!sequelize) {
        throw new Error('Sequelize instance is required');
    }

    return sequelize.define('FssParamEntityParties', {
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
        party_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: {
                name: 'unique_party_name_constraint',
                msg: 'Party name must be unique'
            }
        },
        is_gl: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        gl_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'fss_param_entity_gls',  // Assuming this is the related model
                key: 'id'
            },
            onDelete: 'SET NULL',
            name: 'fk_gl_id'
        },
        party_types: {
            type: DataTypes.JSONB,
            defaultValue: []
        },
        is_msme: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_related: {
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
        tableName: 'fss_param_entity_parties',
        freezeTableName: true,  // Prevents automatic pluralization
        underscored: true,      // Ensures column names are snake_case
        // indexes: [
        //     {
        //         unique: true,
        //         fields: ['party_name'],
        //         name: 'unique_party_name'
        //     },
        //     {
        //         name: 'idx_entity_id',
        //         fields: ['entity_id']
        //     },
        //     {
        //         name: 'idx_gl_id',
        //         fields: ['gl_id']
        //     },
        //     {
        //         name: 'idx_created_by',
        //         fields: ['created_by']
        //     }
        // ]
    });
};
