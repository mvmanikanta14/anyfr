const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    if (!sequelize) {
        throw new Error('Sequelize instance is required');
    }

    return sequelize.define('PpeFormBook', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        particular: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        gb_year_st: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: true
        },
        gb_addition: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: true
        },
        gb_deletions: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: true
        },
        gb_acquisition: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: true
        },
        gb_change_due: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: true
        },
        gb_year_end: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: true
        },
        ad_year_st: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: true
        },
        ad_year_value: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: true
        },
        ad_schedule: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: true
        },
        ad_deletions: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: true
        },
        ad_year_end: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: true
        },
        nt_year_end: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: true
        },
        nt_year_st: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: true
        },
        entity_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created_on: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false,
        tableName: 'ppe_form_book'
    });
};
