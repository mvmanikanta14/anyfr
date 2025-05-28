const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    if (!sequelize) {
        throw new Error('Sequelize instance is required');
    }

    return sequelize.define('FssMastPartyRelationshipTypes', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        relationship_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: {
                name: 'unique_relationship_name_constraint',
                msg: 'Relationship name must be unique'
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
            name: 'fk_created_by'  // Explicit foreign key name
        },
        created_on: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false,
        tableName: 'fss_mast_party_relationship_types',
        freezeTableName: true,  // Prevents automatic pluralization
        underscored: true,      // Converts column names to snake_case in DB
        // indexes: [
        //     {
        //         unique: true,
        //         fields: ['relationship_name'],
        //         name: 'unique_relationship_name'
        //     },
        //     {
        //         name: 'idx_is_active',
        //         fields: ['is_active']
        //     }
        // ]
    });
};
