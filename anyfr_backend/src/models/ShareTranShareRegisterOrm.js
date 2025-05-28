const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    if (!sequelize) {
        throw new Error('Sequelize instance is required');
    }

    return sequelize.define('ShareTranShareRegister', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        shareholder_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        number_of_shares: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        date_of_issue: {
            type: DataTypes.DATE,
            allowNull: false
        },
        face_value_per_share: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0
            }
        },
        issued_value_per_share: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0
            }
        },
        total_face_value: {
            type: DataTypes.VIRTUAL,
            get() {
                return this.number_of_shares * this.face_value_per_share;
            }
        },
        total_issued_value: {
            type: DataTypes.VIRTUAL,
            get() {
                return this.number_of_shares * this.issued_value_per_share;
            }
        },
        instrument_from: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        instrument_to: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        type_of_share_id: {
            type: DataTypes.INTEGER,
            references: { model: 'share_master_type_of_shares', key: 'id' },
            onDelete: 'CASCADE',
            name: 'fk_type_of_share_id'
        },
        class_of_share_id: {
            type: DataTypes.INTEGER,
            references: { model: 'share_param_class_of_shares', key: 'id' },
            onDelete: 'CASCADE',
            name: 'fk_class_of_share_id'
        },
        mode_of_issue_id: {
            type: DataTypes.INTEGER,
            references: { model: 'share_param_mode_of_issues', key: 'id' },
            onDelete: 'CASCADE',
            name: 'fk_mode_of_issue_id'
        },
        type_of_shareholder_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        is_approved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        approved_on: {
            type: DataTypes.DATE,
            defaultValue: null
        },
        approved_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'basic_mast_users',
                key: 'id'
            },
            onDelete: 'SET NULL',
            name: 'fk_approved_by'
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
        tableName: 'share_tran_share_register',
        freezeTableName: true,  // Prevents automatic pluralization
        underscored: true,      // Converts column names to snake_case
        // indexes: [
        //     {
        //         name: 'idx_entity_id',
        //         fields: ['entity_id']
        //     },
        //     {
        //         name: 'idx_type_of_share_id',
        //         fields: ['type_of_share_id']
        //     },
        //     {
        //         name: 'idx_class_of_share_id',
        //         fields: ['class_of_share_id']
        //     },
        //     {
        //         name: 'idx_mode_of_issue_id',
        //         fields: ['mode_of_issue_id']
        //     },
        //     {
        //         name: 'idx_approved_by',
        //         fields: ['approved_by']
        //     },
        //     {
        //         name: 'idx_created_by',
        //         fields: ['created_by']
        //     }
        // ]
    });
};
