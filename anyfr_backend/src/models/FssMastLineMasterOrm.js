const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    if (!sequelize) {
        throw new Error('Sequelize instance is required');
    }

    return sequelize.define('FssMastLineMaster', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        framework_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'fss_mast_financial_framework',
                key: 'id'
            },
            onDelete: 'CASCADE',
            name: 'fk_framework_id'
        },
        core_master_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'fss_mast_core_line_master',
                key: 'id'
            },
            onDelete: 'SET NULL',
            name: 'fk_core_master_id'
        },
        line_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        falling_under: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'fss_mast_line_master',
                key: 'id'
            },
            onDelete: 'SET NULL',
            name: 'fk_falling_under'
        },
        polarity: {
            type: DataTypes.STRING(3),
            allowNull: false,
            validate: {
                isIn: [['+ve', '-ve']]
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
        tableName: 'fss_mast_line_master',
        freezeTableName: true,  // Prevents automatic pluralization
        underscored: true,      // Converts column names to snake_case
        // indexes: [
        //     {
        //         unique: true,
        //         fields: ['framework_id', 'line_name'],
        //         name: 'unique_framework_line_name'
        //     },
        //     {
        //         name: 'idx_falling_under',
        //         fields: ['falling_under']
        //     },
        //     {
        //         name: 'idx_framework_id',
        //         fields: ['framework_id']
        //     }
        // ]
    });
};
