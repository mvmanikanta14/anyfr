const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    if (!sequelize) {
        throw new Error('Sequelize instance is required');
    }

    return sequelize.define('FssMastFinancialFramework', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        framework_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: {
                name: 'unique_framework_name_constraint',
                msg: 'Framework name must be unique'
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
        tableName: 'fss_mast_financial_framework',
        freezeTableName: true,  // Prevents automatic pluralization
        underscored: true,      // Converts column names to snake_case
        // indexes: [
        //     {
        //         unique: true,
        //         fields: ['framework_name'],
        //         name: 'unique_framework_name'
        //     },
        //     {
        //         name: 'idx_created_on',
        //         fields: ['created_on']
        //     }
        // ]
    });
};
