const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    if (!sequelize) throw new Error('Sequelize instance is required');

    return sequelize.define('BasicParamModules', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        module_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'basic_mast_modules',
                key: 'id'
            },
            onDelete: 'SET NULL'
        },
        entity_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'basic_param_entities',
                key: 'id'
            },
            onDelete: 'CASCADE',
            name: 'fk_entity_id'
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
            onDelete: 'SET NULL'
        },
        created_on: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'basic_param_modules',
        timestamps: false,
        underscored: true,
        freezeTableName: true
    });
};
