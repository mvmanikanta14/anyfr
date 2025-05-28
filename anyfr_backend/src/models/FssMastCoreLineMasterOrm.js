const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    if (!sequelize) {
        throw new Error('Sequelize instance is required');
    }

    return sequelize.define('FssMastCoreLineMaster', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        core_master_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: {
                name: 'unique_core_master_name_constraint',
                msg: 'Core master name must be unique'
            }
        },
        falling_under: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'fss_mast_core_line_master',
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
        description: {
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
        tableName: 'fss_mast_core_line_master',
        freezeTableName: true,  // Prevents automatic pluralization
        underscored: true,      // Converts field names to snake_case in DB
        // indexes: [
        //     {
        //         unique: true,
        //         fields: ['core_master_name'],
        //         name: 'unique_core_master_name'
        //     },
        //     {
        //         name: 'idx_falling_under',
        //         fields: ['falling_under']
        //     }
        // ]
    });
};
