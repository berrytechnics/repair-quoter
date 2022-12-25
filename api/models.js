import {sequelize} from './database.js'
import {DataTypes} from 'sequelize'

export const LeadModel = sequelize.define('Lead',{
    firstName:DataTypes.STRING,
    lastName:DataTypes.STRING,
    location:DataTypes.STRING,
    email:DataTypes.STRING,
    phone:DataTypes.STRING,
    make:DataTypes.STRING,
    model:DataTypes.STRING,
    issue:DataTypes.STRING,
    price:DataTypes.FLOAT,
    emailed:DataTypes.BOOLEAN,
    responded:DataTypes.BOOLEAN,
    converted:DataTypes.BOOLEAN
})