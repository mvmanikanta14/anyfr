const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    if (!sequelize) {
        throw new Error('Sequelize instance is required');
    }

    return sequelize.define('ShareFormReconciliation', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        particular: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        previous_year: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        previous_year_amt: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: false
        },
        previous_year_shares: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        current_year: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        current_year_amt: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: false
        },
        current_year_shares: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        entity_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_on: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false,
        tableName: 'share_form_reconciliation'
    });
};
