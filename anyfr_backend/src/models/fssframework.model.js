const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/database');
const Users = require('./user.model');

const FssFrameworks = sequelize.define('FssFrameworks',{
    'id':{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    'framework_name':{
        type:DataTypes.STRING,
        allowNull:false,
        unique:'framework_name_index'
    },
    'is_active':{
        type:DataTypes.INTEGER(1),
        defaultValue:1
    },
    'created_by':{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    // indexes:[
    //     {
    //         fields:['framework_name'],
    //         name:'framework_name_index',
    //         unique:true
    //     }
    // ]
});
FssFrameworks.belongsTo(Users,{foreignKey:'created_by',as:'creator'})
module.exports = FssFrameworks;

