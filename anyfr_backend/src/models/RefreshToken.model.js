const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/database');

const RefreshToken = sequelize.define('RefreshToken',{
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});
module.exports = RefreshToken;

