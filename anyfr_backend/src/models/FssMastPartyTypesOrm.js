const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    if (!sequelize) {
        throw new Error('Sequelize instance is required');
    }

    return sequelize.define('FssMastPartyTypes', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        party_type_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: {
                name: 'unique_party_type_name_constraint',
                msg: 'Party type name must be unique'
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
        tableName: 'fss_mast_party_types',
        freezeTableName: true,  // Prevents automatic pluralization
        underscored: true,      // Converts column names to snake_case in DB
        // indexes: [
        //     {
        //         unique: true,
        //         fields: ['party_type_name'],
        //         name: 'unique_party_type_name'
        //     },
        //     {
        //         name: 'idx_is_active',
        //         fields: ['is_active']
        //     }
        // ]
    });
};
