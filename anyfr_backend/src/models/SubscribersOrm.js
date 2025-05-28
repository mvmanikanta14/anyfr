const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    if (!sequelize) {
        throw new Error('Sequelize instance is required');
    }

    return sequelize.define('Subscribers', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        subscriber_id: {
            type: DataTypes.STRING(12),
            allowNull: false,
            unique: {
                name: 'unique_subscriber_id_constraint',
                msg: 'Subscriber ID must be unique'
            }
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: {
                name: 'unique_email_constraint',
                msg: 'Email must be unique'
            }
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false,
        tableName: 'subscribers',
        freezeTableName: true,  // Prevents automatic pluralization
        underscored: true,      // Ensures column names are snake_case
        // indexes: [
        //     {
        //         unique: true,
        //         fields: ['subscriber_id'],
        //         name: 'unique_subscriber_id'
        //     },
        //     {
        //         unique: true,
        //         fields: ['email'],
        //         name: 'unique_email'
        //     },
        //     {
        //         name: 'idx_created_at',
        //         fields: ['created_at']
        //     }
        // ],
        hooks: {
            beforeCreate: (subscriber) => {
                // Generate a random 12-digit subscriber_id before creating a record
                subscriber.subscriber_id = Math.floor(100000000000 + Math.random() * 900000000000).toString();
            }
        }
    });
};
