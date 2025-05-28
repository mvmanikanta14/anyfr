const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    if (!sequelize) {
        throw new Error('Sequelize instance is required');
    }

    return sequelize.define('FssParanEntityPartyRelations', {
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
        party_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'fss_param_entity_parties',  // Assuming this is the related model
                key: 'id'
            },
            onDelete: 'CASCADE',
            name: 'fk_party_id'
        },
        relationship_type_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'fss_mast_party_relationship_types',  // Assuming this is the related model
                key: 'id'
            },
            onDelete: 'CASCADE',
            name: 'fk_relationship_type_id'
        },
        relation_start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        relation_end_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        remarks: {
            type: DataTypes.TEXT,
            allowNull: true
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
        tableName: 'fss_paran_entity_party_relations',
        freezeTableName: true,  // Prevents automatic pluralization
        underscored: true,      // Ensures column names are snake_case
        // indexes: [
        //     {
        //         name: 'idx_entity_id',
        //         fields: ['entity_id']
        //     },
        //     {
        //         name: 'idx_party_id',
        //         fields: ['party_id']
        //     },
        //     {
        //         name: 'idx_relationship_type_id',
        //         fields: ['relationship_type_id']
        //     },
        //     {
        //         name: 'idx_created_by',
        //         fields: ['created_by']
        //     }
        // ]
    });
};
