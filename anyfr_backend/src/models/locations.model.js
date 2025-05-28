const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/database');
const Users = require('../models/user.model');

const Locations  = sequelize.define('Locations',{
   'id':{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
   },
   'location_name':{
     type:DataTypes.STRING,
     allowNull:false,
     unique:'unique_location_name_index'
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
    indexes:[
        {
            unique:true,
            fields:['location_name'],
            name:'unique_location_name_index'
        }
    ]
});
Locations.belongsTo(Users,{foreignKey:'created_by',as:'creator'});
module.exports = Locations;