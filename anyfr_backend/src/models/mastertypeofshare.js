/*const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');  // Import Sequelize instance

const mastertypeofshare = sequelize.define("mastertypeofshare", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type_of_share_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    created_by: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    created_on: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "master_type_of_shares",
    timestamps: false // Since created_on already exists
});

module.exports = mastertypeofshare;
*/